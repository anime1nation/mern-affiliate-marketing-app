const mongoose = require('mongoose');

const  AdminSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    username:{
        type:String
    },
    mobile:{
        type:String,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    },
});

module.exports = Admin = mongoose.model('admin', AdminSchema);