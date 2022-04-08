const axios =require('axios');
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const User = require('../../models/User');
const Zoom = require('../../models/Zoom');
const Notice = require('../../models/Notice');
const express = require('express');
const router = express.Router();
const Testimonial = require('../../models/Testimonial');
const Admin = require('../../models/Admin');
const adminAuth = require('../../middleware/adminAuth');
const config = require('config');
const mongoose = require('mongoose');
const Grivances = require('../../models/Grivances');

router.get('/admin-list',  async (req, res) => {
    try {
        const admin = await Admin.find();
        res.json(admin);
    } catch (err) {
        console.log(err.messgae);
        res.status(500).json({msg: 'Server error'});
    }
});


router.get('/', adminAuth, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id);
       return res.json(admin);
    } catch (err) {
        console.log(err.messgae);
       return res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/add-admin', [
    check('username', 'Name is required').not().isEmpty(),
    check('mobile', 'Mobile is required').isNumeric().isLength({ min: 10, max: 10 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        const  {
            name,
            mobile,
            username,
            email,
            password,
            role
        } = req.body;


        const admin = await Admin.findOne({mobile:mobile});
        if(admin){
            return res.status(422).json({errors:[{msg:'Admin with this mobile number already exists'}]});
        }
       
        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    



        const newadmin = new Admin({
            name,
            mobile,
            email,
            password: hashedPassword,
            role,
            username,
            isActive:true,
        });
        await newadmin.save();
        

        res.status(200).json(newadmin);


    }catch(err){
        console.log(err.message);
    }
});


//admin login route
router.post('/login',[
    check('username','username is required').not().isEmpty(),
    check('password','Password is required').not().isEmpty(),
],async(req,res)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        username,
        password
    } = req.body

    try{
        const admin = await Admin.findOne({username:username});
        if(!admin){
            return res.status(400).json({errors:[{msg:'No admin with this mobile number'}]});
        }
        const isMatch = await bcrypt.compare(password,admin.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }
        const payload = {
            admin:{
                id:admin.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, admintoken) => {
            if (err) 
                throw err;
            
            res.json({admintoken});
        });

            
    }catch(err){
        console.log(err.message);
    }   
});



//check if aadhar alredy registed by user
router.get('/check-aadhar/:aadhar', async (req, res) => {
    try {
        const aadhar = await User.findOne({ aadhar: req.params.aadhar });
        if (aadhar) {
            return res.status(422).json({ errors: [{ msg: 'Aadhar already registered by other user' }] });
        }
        return res.status(200).json(true);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
});

//check if pan alredy registed by user
router.get('/check-pan/:pan', async (req, res) => {
    try {
        const pan = await User.findOne({ pan: req.params.pan });
        if (pan) {
            return res.status(400).json({ errors: [{ msg: 'Pan already registered by other user' }] });
        }
        return res.status(200).json(true);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
});

//check bank account alredy registed by user
router.get('/check-bank-account/:bankAccount', async (req, res) => {
    try {
        const bankAccount = req.params.bankAccount;
        const user = await User.findOne({ 'bankDetails.accountNo':bankAccount }).select('bankDetails name');
        if (user) {
        
            return res.status(400).json({ errors: [{ msg: 'Bank account already registered by other user' }] });
            
        }
        return res.status(200).json(true);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
});


router.get('/enrolled-users', async(req,res)=>{
    try{
        const users = await User.find({isEnrolled:true,isWalletPaid:true,isAdminBlocked:false}).select('name mobile username referId isEnrolled package uplinkReferId enrolledDate');

        res.json(users);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

})

router.get('/registered-users', async(req,res)=>{
    try{
        const users = await User.find({isEnrolled:false}).select('name mobile username referId isEnrolled package uplinkReferId enrolledDate');

        res.json(users);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

})


router.get('/verified-users', async(req,res)=>{
    try{
        const users = await User.find({isEnrolled:true,isWalletPaid:true,isAdminBlocked:false,isKYCApproved:true}).select('username referId package uplinkReferId enrolledDate');

        res.json(users);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

})

//search by username
router.get('/search-by-username/:username', async(req,res)=>{
    try{
        const username = req.params.username;
        const user = await User.find({username:new RegExp(username, 'i'),isEnrolled:true}).select('username referId package uplinkReferId enrolledDate');
        if(!user){
            return res.status(400).json({msg:'No user with this username'});
        }
        res.status(200).json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

}
);

//get user by packae type
router.get('/users/package/:package',adminAuth,async(req,res)=>{
    try{

        const package = req.params.package;

        const users = await User.find({
            package:package,isEnrolled:true,isKYCApproved:true
        }).select('username referId package uplinkReferId enrolledDate')


        return res.status(200).json(users);
    }catch(err){

        console.log(err.message);
        return res.status(500).json({msg:'Server Error'});
    }
})

//load indiviual user 
router.get('/user/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const userId = mongoose.Types.ObjectId(id);
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

router.get('/wallet-request', async (req, res) => {

    //find all users whose isWalletPaid is true and isWalletApproved is false
    try {
        const users = await User.find({
            isWalletPaid: true,
            isWalletApproved: false,
            isWalletDeclined: false
        });

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



router.get('/kyc-request', async (req,res)=>{

    try{
        //find user whoes kyc request is not approved
        const users = await User.find({
            isKYCApproved:false,
            isKYCDeclined:false,
            isKYCSubmitted:true
        });

        const KYCUsers = users.map(user=>{
            return {
                name:user.name,
                email:user.email,
                mobile:user.mobile,
                id:user._id,
                package:user.package,
                username:user.username,
                referId:user.referId,
                enrollDate :user.enrolledDate,
            }
        });
    
        res.status(200).json(KYCUsers);

    }catch(err){
        console.eroor(err.message);
        res.status().send('Server Error');
    }

} )


router.get('/grivance-list',async(req,res)=>{
    try{
        const grivanceList = await Grivances.find().select('subject description category referenceId img status isClosed')
        return res.status(200).json({grivanceList});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



//comment on grivances 
router.post('/grivances-comment/:refrenceId',adminAuth,async(req,res)=>{

    try{
        
        const {
            msg
        }=req.body

        const refrenceId = req.params.refrenceId;

        const grivance = await Grivances.findOneAndUpdate({referenceId:refrenceId},{$push:{comments:{commentBy:'Admin',msg}}});

        if(!grivance){
            return res.status(400).json({errors:[{msg: 'Grivance not found'}]});
        }
        return res.status(200).json({
            msg:'Message sent successfully'
        });

        
    }catch(err){

    }

});


//get grivances details of indiviual grivance
router.get('/grivance-detail/:refrenceId',async(req,res)=>{
    try{

        const refrenceId = req.params.refrenceId;
        const grivance = await Grivances.findOne({referenceId:refrenceId}).select('subject description category img status referenceId isClosed');
        if(!grivance){
            return res.status(400).json({errors:[{msg: 'Grivance not found'}]});
        }

       return res.status(200).json(grivance);


    }catch(err){

            console.log(err.message);
            res.status(500).json({errors:[{msg:'Server Error'}]});

    }
});


router.get('/grivances/:status',adminAuth,async(req,res)=>{
    try{

        const status = req.params.status;

        const grivances = await Grivances.find({
            status:status
        }).select('subject description category img status referenceId isClosed');

        return res.status(200).json(grivances);

    }catch(err){
        console.log(err.message);
    }

})



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


//change status of grivances 
router.post('/grivance-status/:referenceId',adminAuth,async(req,res)=>{
    try{
        const refrenceId = req.params.referenceId;
        const {
            status
        } = req.body;
        

        const grivance = await Grivances.findOneAndUpdate({referenceId:refrenceId},
            {
            $set:{
            'status':status
                }
            },{new:true});

        if(!grivance){
            return res.status(400).json({errors:[{msg: 'Grivance not found'}]});
        }

        return res.status(200).json({
            msg:'Status updated successfully'
        });

    }catch(err){
        return res.status(500).json({
            errors:[{
                msg:"Server Error"
            }]
        })
    }
});


//grivance close 
router.post('/grivance-close/:referenceId',adminAuth,async(req,res)=>{
    try{
        const refrenceId = req.params.referenceId;
        const {
            status
        } = req.body;

        const grivance = await Grivances.findOneAndUpdate({referenceId:refrenceId},{'status':status,'isClosed':true});

        if(!grivance){
            return res.status(400).json({errors:[{msg: 'Grivance not found'}]});
        }

        

        return res.status(200).json({
            msg:'Status updated successfully'
        });

    }catch(err){
        return res.status(500).json({
            errors:[{
                msg:"Server Error"
            }]
        })
    }
});



router.get('/grivance-list',async(req,res)=>{
    try{
        const grivanceList = await Grivances.find();
        return res.status(200).json({grivanceList});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/grivances/:status',async(req,res)=>{
    try{

        const status = req.params.status;

        const grivances = await Grivances.find({
            status:status
        });

        return res.status(200).res.json(grivances);

    }catch(err){
        console.log(err.message);
    }

})



//block a user
router.post('/block/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const userId = mongoose.Types.ObjectId(id);
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        user.isAdminBlocked = true;
        await user.save();
        res.status(200).json({msg:'User blocked'});
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

})

router.get('/daily-payout/all', async (req, res) => {
    try{
        const users = await User.find({
            isEnrolled:true,
            
        }).sort({
            earningDate: -1
            }).select('dayEarning name referId bankDetails _id');
        res.json(users);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/add-testimonial', async(req,res)=>{
    try{
        const {name,msg,avatar} = req.body;
        
        if(!name || !msg || !avatar){
            return res.status(400).json({
                errors:[{
                    msg:'Please enter all details'
                }]
            })
        }
        const newTestimonial = new Testimonial({
            name,
            msg,
            avatar
        });
        await newTestimonial.save();
        res.json({msg:'Testimonial added successfully'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/add-classes',async(req,res)=>{ 
    try{
        const {link,package,day} = req.body;

        
        
        const zoom = await Zoom.findOneAndUpdate({package,day},{
            $set:{
                link
            }
        });

        if(!zoom){
            const newZoom = new Zoom({
                link,
                package,
                day
            });
            await newZoom.save();
            console.log(newZoom)
        }


        res.status(200).json({msg:'Classes added successfully'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


router.post('/add-notice', async(req,res)=>{
    try{
        const {msg} = req.body;
        const newNotice = new Notice({
            msg,
            datePosted:Date.now()
        });
        await newNotice.save();
        res.status(200).json({msg:'Notice added successfully'});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



router.get('/notices',async(req,res)=>{
    try{
        const notice = await Notice.find();

       return res.status(200).json({notice})
    }
    catch(err){
        console.log(err,message);
        return res.json({errors:[{msg:'Server Error'}]})
    }
})


//get dailyEarning based on date from all users
router.get('/daily-payout/:date', async (req, res) => {
    try {
        const date = req.params.date;
        //find using aggregation and pipeline based on dayEarning earningDate is date
        
        const users = await User.find({
            isEnrolled:true,
            isKYCApproved:true,
            'dayEarning.earningDate':date
        }).sort({   
        earningDate: -1
        }).select('dayEarning name referId bankDetails _id');

        
        

        res.json(users);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//approve daily payout for a user of a particular date
router.post('/approve-daily-payout/:id/:date', async (req, res) => {
    try {
        const id = req.params.id;
        const date = req.params.date;
        const userId = mongoose.Types.ObjectId(id);
        
        //update dayEarning of user of a particular date 
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        
        //find index in dayEarning of particular day
        const index = user.dayEarning.findIndex(day=>day.earningDate===date);
        if(index===-1){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }

        //update dayEarning of user of a particular date
        user.dayEarning[index].isApproved = true;

        
        await user.save();
        res.status(200).json({msg:'Daily payout approved successfully'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//decline daily payout for a user of a particular date
router.post('/decline-daily-payout/:id/:date', async (req, res) => {
    try {
        const id = req.params.id;
        const date = req.params.date;
        const userId = mongoose.Types.ObjectId(id);
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        //find user dayEarning index of date
        const index = user.dayEarning.findIndex(day=>day.earningDate===date);
        //update dayEarning of user
        user.dayEarning[index].isDeclined = true;
        await user.save();
        res.status(200).json({msg:'Daily payout declined successfully'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//get kyc details of usert
router.get('/kyc-details/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        const data = {
            name:user.name,
            mobile:user.mobile,
            email:user.email,
            username:user.username,
            address:user.address1,
            pan:user.pan,
            aadhar:user.aadhar,
            aadharBackImg:user.aadharBackImg,
            aadharFrontImg:user.aadharFrontImg,
            panImg:user.panImg,
            passbookImg:user.passbookImg,
            package:user.package,
            bankDetails:user.bankDetails,
            referId:user.referId,
            uplinkReferId:user.uplinkReferId,
            isKYCApproved:user.isKYCApproved,
            isKYCDeclined:user.isKYCDeclined,
            dob:user.dob,
            enrolledDate:user.enrolledDate


        }
        res.status(200).json({data});
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});



//get all testimonials
router.get('/all-testimonials',async(req,res)=>{
    try{
        const testimonials = await Testimonial.find();
        res.status(200).json({testimonials});
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//delete a testimonial
router.delete('/delete-testimonial/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const testimonial = await Testimonial.findById(id);
        if(!testimonial){
            return res.status(400).send({errors:[{msg:'Testimonial not found'}]});
        }
        await testimonial.remove();
        res.status(200).json({msg:'Testimonial deleted successfully'});
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
}
)


//get bank details of user
router.get('/bank-details/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        const data = {
            accountNo:user.bankDetails.accountNo,
            ifsc:user.bankDetails.ifsc,
            bankName:user.bankDetails.bankName,
            branchName:user.bankDetails.branchName,
            branchCity:user.bankDetails.branchCity,
            branchState:user.bankDetails.branchState,
            upiId:user.bankDetails.upiId,


        }
        res.status(200).json({data});
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});


//approve kyc request
router.put('/kyc-request/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        user.isKYCApproved = true;
        await user.save();
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//decline kyc request
router.post('/kyc-decline/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        user.isKYCApproved = false;
        user.isKYCDeclined = true;
        user.KYCDeclineReason = req.body.reason;
        //delete aadhar pan and images
        user.aadhar='';
        user.pan='';
        user.aadharFrontImg='';
        user.aadharFrontImg='';
        user.panImg='';
        user.passbookImg='';


        await user.save();
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//approve kyc
router.put('/kyc-approve/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        user.isKYCApproved = true;
        user.isKYCDeclined = false;
        
        await user.save();
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//approve wallet request
router.post('/approve-wallet/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const userId = mongoose.Types.ObjectId(id);
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        console.log(user);
        user.isWalletApproved = true;
        await user.save();
        res.json({msg:'Wallet request approved'});
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//reject wallet request
router.post('/reject-wallet/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const userId = mongoose.Types.ObjectId(id);
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        user.isWalletDeclined = true;
        await user.save();
        res.json({msg:'Wallet request rejected'});
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//payout approve 
router.put('/payout-approve/:id/:date', async (req,res)=>{
    try{
        const id = req.params.id;
        //find dayEarning by earnedDate

        const user = await User.findById({id},{dayEarning:{
            earningDate:date
        }}).select('dayEarning');
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        user.isApproved = true;
        await user.save();
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//payout decline
router.put('/payout-decline/:id/:date', async (req,res)=>{

    try{
        const id = req.params.id;
        //find dayEarning by earnedDate

        const user = await User.findById({id},{dayEarning:{
            earningDate:date
        }}).select('dayEarning');
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        user.isDeclined = false;
        await user.save();
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//delete  post by notice id
router.delete('/delete-notice/:id', async(req,res)=>{
    
     try{
        const id = req.params.id;
        const notice =  Notice.findByIdAndRemove(id)
        if(!notice){
            return res.status(400).json({errors:[{msg:'Notice not found'}]});
        }
        res.json({msg:'Notice deleted successfully'});
     }catch(err){
         return res.status(500).json({errors:[{msg:'Server Error'}]})
     }       
        });


//add firstGen referral 
router.post('/add-firstGen/:id', async (req,res)=>{  
    try{
        const id = req.params.id;
        const firstGen = req.body.user;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).send({errors:[{msg:'User not found'}]});
        }
        console.log(firstGen);
        user.firstGen.push(firstGen);
        await user.save();
        res.json(firstGen);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }  
    
});


module.exports = router;