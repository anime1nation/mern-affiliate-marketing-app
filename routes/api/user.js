const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const accountSid = config.get('TWILIO_ACCOUNT_SID');
const authToken = config.get('TWILIO_AUTH_TOKEN');
const twilioNumber= config.get('TWILIO_NUMBER');
const userAuth = require('../../middleware/userAuth');
const User = require('../../models/User');
const Notice = require('../../models/Notice');
const Grivances = require('../../models/Grivances');
const moment = require('moment');
const mongoose = require('mongoose');
const client = require('twilio')(accountSid, authToken,{
    lazyLoading: true
});


router.get('/',userAuth,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('name mobile email isAdminBlocked' );
      return  res.status(200).json(res.data);
    }catch(err){
        res.status(500).json({
            msg:'Server Error'
        });
    }
});

//check if user  isEnrolled 
router.get('/isEnrolled',userAuth,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('isEnrolled' );
        if(user.isEnrolled){
            return res.status(200).json(
                true
            );
        }else{
            return res.status(200).json(
                false
            );
        }
    }catch(err){
        res.status(500).json({
            msg:'Server Error'
        });
    }
});


router.post('/sign-up',[
check('mobile','Mobile is required').isNumeric().isLength({min:10,max:10}),
check('name','Name is required').not().isEmpty(),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()});
    }

    try{
        const {mobile,name}=req.body;
        let user = await User.findOne({mobile});
        if(user && user.isActive && user.isWalletPaid){ 
            return res.json({errors:[{msg: 'User already exists'}]});
        }
        user=new User({
            name,
            mobile
            });

        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) 
                throw err;
                
    
            res.json({token})
        });
        
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}

);


//user login router
router.post('/sign-in',[
    check('username','Username is required').not().isEmpty(),
    check('password','Password is required').not().isEmpty(),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()});
    }
    const {username,password}=req.body;
    try{

        let user = await User.findOne({username});
        

        
        if(!user){
            return res.status(400).json({errors:[{msg:'Invalid credentials'}]});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid credentials'}]});
        }
        
        if(!user.isWalletPaid){
            return res.status(400).json({errors:[{msg:'Please pay your wallet'}]});
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) 
                throw err;
                
    
            res.json({token})
        });
        
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


//upload profile picture
router.post('/upload-profile-picture',userAuth,async(req,res)=>{
    try{
        
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({msg:'User not found'});
        }
        user.profileImg=req.body.profileImage;
        await user.save();
        res.status(200).json({msg:'Profile picture uploaded successfully'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//get last 5 days transaction




router.get('/latest-transactions',userAuth,async(req,res)=>{

    try{
        const user = await User.findById(req.user.id);
        //get last 5 days earning
        if(!user){ 
            return res.status(400).json({errors:[{msg:'User not found'}]});
        }
        const dayEarning = user.dayEarning.slice(-5);

        return res.json({dayEarning});
        

    }catch(err){
        console.log(err.message);
    }
});


router.post('/wallet-request',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const {
            amount,
            upiId,
            upi,
            country,
            state,
            city,
            paySlip,
            remarks
        } = req.body;
        const user = await User.findById(id);
        
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        if(user.isWalletPaid){
            return res.status(500).json({errors:[{msg: 'Wallet already paid'}]});
        }
        //generate random 5 letter string
        const paymentId = Math.random().toString(36).substring(2, 7);
        const data = {
            paymentId,
            amount,
            upiId,
            upi,
            country,
            state,
            city,
            paySlip,
            datePaid:Date.now(),
            remarks

        }
        
        //update user and insert data in wallet
        user.wallet=data;
        user.isWalletPaid = true;
        await user.save();
        return res.json({msg:`Wallet request submitted, Payment ID: ${paymentId}`});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});


router.post('/send-otp',async (req, res) => {
    const {name,mobile,otp} = req.body;
    try{
        
        client.messages
  .create({
     body: `${name}, Your OTP for FX Brokerage registration is ${otp}`,
     from: twilioNumber,
     to: '+91'+mobile
   })
  .then(message => console.log(message.sid));
        
         
   return res.status(200).send({otp});
    
  }catch(err){
        console.log(err.message);
        res.status(500).json({errors:[{msg: 'Server error'}]});
    }

});

router.post('/forget-password-otp',async (req, res) => {
    const {username,mobile,otp} = req.body;
    if(username===''|| mobile===''||otp===''){
        return res.staus(400).json({errors:[{msg: 'Server error'}]})
    }
    try{

      
        const user = await User.findOne({username,mobile})
        if(!user){
            return res.status(400).json({errors:[{msg: 'Please enter valid details'}]})
        }

        
        client.messages
  .create({
     body: `${username}, Your OTP for FX Brokerage registration is ${otp}`,
     from: '+16264697276',
     to: '+91'+mobile
   })
  .then(message => console.log(message.sid));
        
         
   return res.status(200).send({otp});
    
  }catch(err){
        console.log(err.message);
        res.status(500).json({errors:[{msg: 'Server error'}]});
    }

});



//enroll user and give commision to 3 genration uplinks
router.post('/enroll',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const {
            referalId,
            name,
            adress1,
            adress2,
            dob,
            password,
            email,
            uplinkId,
            pin,
            username,
            enrollPackage
        } = req.body;
        console.log(req.body);
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({errors:[{msg: 'User not found'}]});
        }
        if(user.isEnrolled){
            return res.status(400).json({errors:[{msg: 'User already enrolled'}]});
        }
        if(!user.isWalletPaid){
            return res.status(400).json({errors:[{msg: 'Wallet not paid'}]});
        }
        //generate random 5 letter string strting with  FX
        const userReferId = ('FX'+Math.random().toString(36).substring(2, 7)).toUpperCase();
       //encrypt password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password,salt);


       
        const data = {
            referId:userReferId,
            uplinkReferId:referalId,
            name,
            adress1,
            adress2,
            dob,
            password:hashedPassword,
            email,
            uplinkId,
            isEnrolled:true,
            username,
            package:enrollPackage,
            enrolledDate:moment().format('YYYY-MM-DD'),

        }


        
        //get uplink user

       const firstuplink = await User.findById(uplinkId);     
        

        
        if(!firstuplink){
            return res.status(500).json({errors:[{msg: 'Referal Id not found'}]});
        }

        firstuplink.firstGen.push(id);

        

        
      

        //find today date in uplink dayEarning
        const today = moment().format('YYYY-MM-DD');
        const dayIndex = firstuplink.dayEarning.findIndex(day => day.earningDate === today);
        console.log(dayIndex);
        if(dayIndex===-1){
            firstuplink.dayEarning.push({
                earningDate:today,
                firstGenDayEarning:450
            });
        }

        else{//update today dayEarning in firstGenDayEarning
        firstuplink.dayEarning[dayIndex].firstGenDayEarning += 450;
        
        }
        firstuplink.firstGenCount += 1;
        firstuplink.totalFirstGenEarning += 450;
        firstuplink.save();

        if(firstuplink.uplinkId){
        const secondUplink = firstuplink.uplinkId;


        //get second uplink
        const secondUplinkUser = await User.findById(secondUplink);
        if(secondUplinkUser){
            //update today dayEarning in secondGenEarning 
            const secondUplinkIndex = secondUplinkUser.dayEarning.findIndex(day => day.earningDate === today);
            if(secondUplinkIndex===-1){
                secondUplinkUser.dayEarning.push({
                    earningDate:today,
                    secondGenDayEarning:175
                });
            }
            else{
                secondUplinkUser.dayEarning[secondUplinkIndex].secondGenDayEarning += 175;

                
            }  
            secondUplinkUser.secondGenCount += 1;
            secondUplinkUser.totalSecondGenEarning += 175;
            secondUplinkUser.save();

        }



        const thirdUplink = secondUplinkUser.uplinkId;
        //get third uplink
        const thirdUplinkUser = await User.findById(thirdUplink);
        if(thirdUplinkUser){
            //update today dayEarning in thirdGenEarning
            const thirdUplinkIndex = thirdUplinkUser.dayEarning.findIndex(day => day.earningDate === today);
            if(thirdUplinkIndex===-1){
                thirdUplinkUser.dayEarning.push({
                    earningDate:today,
                    thirdGenDayEarning:60
                });
            }else{
                
            thirdUplinkUser.dayEarning[thirdUplinkIndex].thirdGenDayEarning += 60;
            
            }
            thirdUplinkUser.thirdGenCount += 1;
            thirdUplinkUser.totalThirdGenEarning += 60;
            thirdUplinkUser.save();
        }
    }

        user.set(data);
        await user.save();

        

        return res.status(200).json(user);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



//get wallet data
router.get('/get-wallet-deatils',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        return res.status(200).json(user.wallet);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});








//get total today earning of user
router.get('/today-earning',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        const today = moment().format('YYYY-MM-DD');
        console.log('today is'+today)
        
        //find sum of today earnings
        const todayIndex = user.dayEarning.findIndex(day => day.earningDate === today);
        if(todayIndex===-1){
            return res.status(200).json({todayEarning:0});
        }
        const todayEarning = user.dayEarning[todayIndex];

        const data = todayEarning.firstGenDayEarning + todayEarning.secondGenDayEarning + todayEarning.thirdGenDayEarning;

        return res.status(200).json(data);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



router.get('/uplink-name/:referId',async(req,res)=>{
    try{
        const referId = req.params.referId;
        const uplink = await User.findOne({
            referId:referId
        }).select('name isAdminBlocked');
        return res.status(200).json({uplink});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/update-basic-details',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const {
            email,
            mobile,
            address1,
            aadhar,
            pan,

        } = req.body.formData;
        const user = await User.findById(id);
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        if(!user.isEnrolled){
            return res.status(500).json({errors:[{msg: 'User not enrolled'}]});
        }
        if(!user.isWalletPaid){
            return res.status(500).json({errors:[{msg: 'Wallet not paid'}]});
        }
        const data = {
            
            email,
            mobile,
            address1,
            aadhar,
            pan,
        }
        user.email = email;
        user.mobile = mobile;
        user.address1 = address1;
        user.aadhar = aadhar;
        user.pan = pan;
        
        await user.save();
        return res.status(200).json({msg:'Basic details updated'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//update kyc documents
router.post('/update-kyc-documents',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const {
            
            aadharFrontImg,
            aadharBackImg,
            panImg,
            passbookImg
        } = req.body;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({errors:[{msg: 'User not found'}]});
        }
        if(!user.isEnrolled){
            return res.status(400).json({errors:[{msg: 'User not enrolled'}]});
        }
        if(!user.isWalletPaid){
            return res.status(400).json({errors:[{msg: 'Wallet not paid'}]});
        }
        if(user.isKYCSubmitted){
            return res.status(400).json({errors:[{msg: 'You have alredy submitted documents'}]});
        }
        if(user.aadharFrontImg && user.aadharBackImg && user.panImg && user.passbookImg){
            return res.status(400).json({errors:[{msg: 'You have alredy submitted documents'}]});
        }
        user.aadharFrontImg=aadharFrontImg;
        user.aadharBackImg=aadharBackImg;
        user.panImg=panImg;
        user.passbookImg=passbookImg;
        user.isKYCSubmitted=true;
        await user.save();
        return res.status(200).json({msg:'Kyc documents updated'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//get kyc documents is uploaded or not
router.get('/kyc-documents-uploaded',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        if(!user.isEnrolled){
            return res.status(500).json({errors:[{msg: 'User not enrolled'}]});
        }
        if(!user.isWalletPaid){
            return res.status(500).json({errors:[{msg: 'Wallet not paid'}]});
        }
        const data = {
            aadharFrontImg:user.aadharFrontImg,
            aadharBackImg:user.aadharBackImg,
            panImg:user.panImg,
            passbookImg:user.passbookImg,
        }
        return res.status(200).json(data);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/update-bank-details',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const {
            bankName,
            ifsc,
            upiId,
            accountNo,
            branchName,
            branchCity,
            branchState,
            
        } = req.body.formData;

        //find and update the bankDetails

        const user = await User.findOneAndUpdate({
            _id:id
        },{
            $set:{
                'bankDetails.bankName':bankName,
                'bankDetails.ifsc':ifsc,
                'bankDetails.upiId':upiId,
                'bankDetails.accountNo':accountNo,
                'bankDetails.branchName':branchName,
                'bankDetails.branchCity':branchCity,
                'bankDetails.branchState':branchState,

            }
        },{new:true});
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }

        
     return res.status(200).json({msg:'Bank details updated'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//get all status 
router.get('/get-all-status',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        
        const data = {

            isKYCSubmitted:user.isKYCSubmitted,
            isEnrolled:user.isEnrolled,
            isWalletPaid:user.isWalletPaid,
            isKYCApproved:user.isKYCApproved,
            isKYCRejected : user.isKYCRejected,
            

        }

        return res.status(200).json(data);


        
    }catch(err){

        return res.status(500).json({
            errors:[{msg:'Server Error'}]
        })

    }
});



//get zoom meeting link
router.get('/get-zoom-meeting-link',userAuth,async(req,res)=>{
    try{

        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        const package = await Zoom.find({package:user.package}).limit(3);
        if(!package){
            return res.status(400).json({errors:[{msg: 'Package not found'}]});
        }
        return res.status(200).json(package);

    }catch(err){

        return res.status(500).json({
            errors:[{msg:'Server Error'}]
        })

    }
});

//get profile details
router.get('/profile-details',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        if(!user.isEnrolled){
            return res.status(500).json({errors:[{msg: 'User not enrolled'}]});
        }
        if(!user.isWalletPaid){
            return res.status(500).json({errors:[{msg: 'Wallet not paid'}]});
        }
        const data = {
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            address1:user.address1,
            username:user.username,
            referId:user.referId,
            staus:user.isActive ? 'Active' : 'Inactive',
            KYCstatus: user.isKYCApproved ? 'Approved' : (user.isKYCDeclined ? 'Rejected' : 'Pending'),
            package:user.package,
            dob:user.dob,
            profileImg:user.profileImg,
            uplinkReferId:user.uplinkReferId,

        }
        return res.status(200).json(data);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

         
        });
//get basic details of user like name,email,mobile,adress1,aadhar,pan
router.get('/basic-details',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        const data = {
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            address1:user.address1,
            aadhar:user.aadhar,
            pan:user.pan,
        };
        return res.status(200).json({data});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//get bankDetails
router.get('/bankDetails',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({errors:[{msg: 'User not found'}]});
        }
        return res.status(200).json(user.bankDetails);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



router.get('/grivance-list',userAuth,async(req,res)=>{
    try{
        const grivanceList = await Grivances.find({
            user:req.user.id
        }).select('subject  category  status isClosed date referenceId');
        return res.status(200).json({grivanceList});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/submit-grivances',userAuth,async(req,res)=>{
    try{
        const id = req.user.id;
        const {
            subject,
            description,
            category,
            img,
        } = req.body;
        console.log(req.body);
        const user = await User.findById(id);
        //genrate 5 letter string start with FX
        const referenceId = 'FX'+Math.random().toString(36).substr(2, 5);

       
        const grivance = new Grivances({
            referenceId,
            user:id,
            subject,
            description,
            category,
            img,
            status:'pending',
            date : Date.now()
        });
        await grivance.save();
        console.log(grivance);
        user.grivances.push(grivance._id);
        await user.save();
        return res.status(200).json(referenceId);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//comment on grivances 
router.post('/grivances-comment/:refrenceId',userAuth, async(req,res)=>{

    try{
        const id = req.user.id;

        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({errors:[{msg: 'User not found'}]});
        }
        const name = user.name;

        const {
            msg
        }=req.body

        const refrenceId = req.params.refrenceId;

        const grivance = await Grivances.findOneAndUpdate({referenceId:refrenceId},{$push:{comments:{commentBy:name,msg}}});

        if(!grivance){
            return res.status(400).json({errors:[{msg: 'Grivance not found'}]});
        }
        return res.status(200).json(msg);

        
    }catch(err){

    }

});


//get grivances details of indiviual grivance
router.get('/grivance-detail/:refrenceId', userAuth,async(req,res)=>{
    try{

        const refrenceId = req.params.refrenceId;
        const grivance = await Grivances.findOne({referenceId:refrenceId}).select('subject description category img status isClosed referenceId');
        if(!grivance){
            return res.status(400).json({errors:[{msg: 'Grivance not found'}]});
        }

       return res.status(200).json(grivance);


    }catch(err){

            console.log(err.message);
            res.status(500).json({errors:[{msg:'Server Error'}]});

    }
});

//get grivances by status 


//get comments of spcific grivance sort by commentAt
router.get('/grivance-comments/:referenceId',async(req,res)=>{
    try{

        const referenceId = req.params.referenceId;
        const grivance = await Grivances.findOne({referenceId:referenceId}).select('comments');
        if(!grivance){
            return res.status(400).json({errors:[{msg: 'Grivance not found'}]});
        }

         return res.status(200).json(grivance.comments);


    }catch(err){
        return res.status(500).json({
            errors:[{
                msg:"Server Error"
            }]
        })
    }
});






router.post('/forget-password', async(req,res)=>{
    try{
        const {mobile,username,password} = req.body;

        //encerypt password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);    
        const user = await User.findOneAndUpdate({
            mobile,
            username
        },{$set:{
            password:hashPassword
        }},{
            new:true
        })

        if(!user){
            return res.status(400).json({errors:[{msg:'Please enter valid username and mobile number'}]});
        }

        return res.status(200).json(true)
        

    }catch(err){
        console.log(err.message);
    }
});
 

router.get('/mobile/:mobile', async (req, res) => {
    try {
        const user = await User.find({mobile: req.params.mobile});
        if (!user) {
            return res.status(400).json({msg: 'User not found'});
        }
        res.json(user);
    } catch (err) {
        console.log(err.messgae);
        res.status(500).json({msg: 'Server error'});
    }
});


//delete user by mobile
router.delete('/mobile/:mobile', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({mobile: req.params.mobile});
        if (!user) {
            return res.status(400).json({msg: 'User not found'});
        }
        res.json(user);
    } catch (err) {
        console.log(err.messgae);
        res.status(500).json({msg: 'Server error'});
    }
});

//get dailyEarning of user
router.get('/dailyEarning/:id', userAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById({id}).select('dayEarning');
        if (!user) {
            return res.status(400).json({msg: 'User not found'});
        }
        console.log(user);
        res.json(user);
    } catch (err) {
        console.log(err.messgae);
        
        res.status(500).json({msg: err.messgae});
    }
});

//upload documents of user
router.post('/upload-documents', userAuth, async (req, res) => {
    try {
        const id = req.user.id;
        const {
            aadharBack,
            aadharFront,
            pan,
            passbookImg
        } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({msg: 'User not found'});
        }
        const data = {
            aadharBackImg : aadharBack,
            aadharFrontImg : aadharFront,
            panImg : pan,
            passbookImg : passbookImg,
        }
        user.unshift(data);
        await user.save();
        return res.status(200).json({msg: 'Documents uploaded'});
    } catch (err) {
        console.log(err.messgae);
        res.status(500).json({msg: 'Server error'});
    }
});


//get testimonials
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().limit(4);
        if (!testimonials) {
            return res.status(400).json({msg: 'Testimonials not found'});
        }
        res.json(testimonials);
    } catch (err) {
        console.log(err.messgae);
        res.status(500).json({msg: 'Server error'});
    }
});

//get notice
router.get('/notices', async (req, res) => {
    try{
        const notice = await Notice.find();
        if(!notice){
            return res.status(400).json({msg: 'Notice not found'});
        }
        res.json(notice);
    }catch(err){
        console.log(err.message);
        res.status(500).json({msg: 'Server error'});
    }
});



        
            

module.exports=router;