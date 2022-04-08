const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const config = require('config');
const userAuth = require('../../middleware/userAuth');





router.get('/', userAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        console.log(err.messgae);
        res.status(500).json({msg: 'Server error'});
    }
});


//find by mobile and check if enrolled
router.get('/check/:mobile',async(req,res)=>{
    try{

        const mobile = req.params.mobile;

        const user = await User.findOne({
            mobile:mobile
        });

        if(!user){
            return res.status(200).json(false);
        }
        
        res.status(200).json(user.isEnrolled);

    }catch(err){
        console.log(err.message);
      res.status(500).json({errors:[{msg:'Server Error'}]});
    }
});


//Registration router
router.post('/sign-up',[
    check('name','Name is required').not().isEmpty(),
    check('mobile','Mobile is required').isNumeric().isLength({min:10,max:10}),
],async(req,res)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    const {
        name,
        mobile
    } = req.body;
    try{
    let user = await User.findOne({mobile:mobile});
    if(!user)
    {   
        user = new User({
            name,
            mobile
        });
        await user.save();
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) 
                throw err;
            
            res.json({token});
        });
        
    }else{
        if(user.isEnrolled){
           return res.status(500).json({errors:[{msg: 'User has already enrolled.'}]});
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
            
    
            res.json({token});
        });
    }
       
} 
catch (err) {
    console.log(err.message);
    res.status(500).json({errors:[{msg: err.message}]});
}
    }

    

);



//@send-otp


module.exports=router;