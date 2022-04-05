const express = require('express');
const app= express();
//const connectDB= require('./config/db');
const bodyParser = require("body-parser")
const cors =require('cors');
const connectDB = require('./config/db');
const adminSeeder = require('./config/data');

connectDB();
adminSeeder();

const PORT=process.env.PORT || 5000;
app.use(cors());
app.use(express.json({limit: '16mb'}));
app.use(express.urlencoded({limit: '16mb', extended: true, 
parameterLimit:50000}));

// Making Build Folder as Public 

app.get('/',(req,res)=>res.send('API WORKING'));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/user',require('./routes/api/user'));
app.use('/api/admin',require('./routes/api/admin'));

app.use('/api/dashboard',require('./routes/api/dashboard'));


app.listen(PORT,()=> console.log(`server started at ${PORT}` ))
