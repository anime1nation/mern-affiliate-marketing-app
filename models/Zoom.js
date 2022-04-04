const mongoose = require('mongoose');

const ZoomSchema = new mongoose.Schema({
    link:{
        type:String,
    },
    package:{
        type:String,
    },
    day:{
        type:String,
    }

});

module.exports = Zoom = mongoose.model('zoom', ZoomSchema);
