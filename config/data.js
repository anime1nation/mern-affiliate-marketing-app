const express = require('express');
const Admin = require('../models/Admin')
const router = express.Router();
const bcrypt = require('bcrypt')
const adminSeeder = async()=>{
    const admin = await Admin.find();
    if(admin.length<1){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('fxbrokerage', salt);
    
        const newAdmin = new Admin({
            name:'Admin',
            username:'fxbrokerage',
            password:hashedPassword,            
        });
        await newAdmin.save();
    }
}

module.exports=adminSeeder;