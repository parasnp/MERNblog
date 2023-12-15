const User=require("../model/user");

module.exports.getRegisterUser = async(req, res)=>{  
   res.render("registerUser");
      
  }
  module.exports.postRegisterUser = async(req, res)=>{  
    const {name,email,password}=req.body;  
    try{
        const userExists = await User.findOne({ email });
        if(userExists)
        {
            res.status(400);
            throw new Error ("User already Created with this email");
        }
        const user= await User.create( {name,email,password});              
        res.render("login");
  
    }
    catch(err){
        res.status(500);
        console.log(err);
    }
       
   }
