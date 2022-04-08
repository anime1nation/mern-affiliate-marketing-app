const express=require('express');
const mongoose = require('mongoose');
const config=require('config');
const mongoURI=config.get('mongoURI');

const db = mongoURI

 const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
      
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message)
  }
}

module.exports=connectDB;