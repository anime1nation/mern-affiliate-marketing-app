const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    msg:{
        type:String
    },
    datePosted:{
        type:Date
    }
    
});

module.exports = Notice = mongoose.model('notice', NoticeSchema);
