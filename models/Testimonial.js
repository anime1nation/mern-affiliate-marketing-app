const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
name:{
    type:String,
},
msg:{
    type:String,
},
avatar:{
    type:String,
},
});

module.exports = Testimonial = mongoose.model('testimonial', TestimonialSchema);

