const dotenv=require("dotenv").config();
const express=require('express');
const expressLayout=require("express-ejs-layouts");
const cookieParser=require('cookie-parser');
//const connectCloud=require("./server/helper/mongoCloud");
const connectToMongoDB= require("./server/helper/localDb");
const userRoutes=require("./server/routes/userRoutes");
const authRoutes=require('./server/routes/authRoutes');
const app=express();
app.use(cookieParser());
const PORT= 3000 || process.env.PORT;

//connectCloud();
connectToMongoDB();

/*middleware to pass data ejs to controller*/
app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.set('view engine', 'ejs');

app.use(express.static('public'));


app.use("/", require("./server/routes/postRoutes"));
app.use(userRoutes);
app.use(authRoutes);


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});