const User=require("../model/user");
const  bcrypt=require('bcrypt');
const jwtToken=require("jsonwebtoken");

module.exports.getLogin = async(req, res)=>{  
   res.render("login");
      
  }

const createToken=(user)=>{
return jwtToken.sign(
    {
    user:{       
        email:user.email,
        id: user.id,
        name:user.name,     
    },
    },
    process.env.SECRET_TOKEN_VALUE,
    {expiresIn: '60m'}
);
}

module.exports.postLogin = async(req, res)=>{     
        const {name,email,password}=req.body;       
        try
        {        
            const user=await User.findOne({email});  
            console.log("in post controller" ,user);     
            if(user)
            {
            const isAuth=await bcrypt.compare(password,user.password);
            if(isAuth)
                {
                    const accessToken=createToken(user);
                    res.cookie('jwtBlog',accessToken,{httpOnly: true});
                    res.redirect('/dashboard');
                }
                else{
                    throw Error("invalid password");
                }               
            }
            else {
            throw Error("invalid email");
            }
        }
        catch(error)
        {
            console.log(error);
        }     
}

module.exports.getLogOut=(req,res)=>{
     // Set the expiration time to 1 millisecond from the current time
     const expirationDate = new Date(Date.now() + 1);

     // Set the cookie with the expires option
     res.cookie('jwtBlog', '', {
         expires: expirationDate,
     });
     res.redirect("/");

}