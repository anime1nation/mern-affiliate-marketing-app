const express=require('express');
const mongoose = require('mongoose');
const config=require('config');
const mongoURI=config.get('mongoURI');

const db = process.env=='production'?mongoURI:'mongodb://127.0.0.1:27017/fx'; 

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