const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/user-details/:referid',async(req,res)=>{
    try{
        const id = req.params.referid;
        const user = await User.findById(id).select('name','referId','profileImg');
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/get-downline/:referId',async(req,res)=>{
    try{
        const id = req.params.referId;
        const user = await User.findOne({
            referId:id
        }).select('firstGen').populate('firstGen','name referId profileImg');
        if(!user){
            return res.status(500).json({errors:[{msg: 'User not found'}]});
        }
        console.log(user);
        res.status(200).json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;