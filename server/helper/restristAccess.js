const jwt= require("jsonwebtoken");
module.exports.restrictaccess=(req,res,next)=>
{   
    
    const token=req.cookies.jwtBlog;
    
    if(token)
    {
        jwt.verify(token,process.env.SECRET_TOKEN_VALUE,(err,decodedToken)=>{
            if(err)
            {
                res.redirect('/login'); 
            }
            else
            {    
                res.locals.CurrentUser=decodedToken.user;              
                next();
            }
        })
    }
    else
    {
        res.redirect('/login'); 
    }
}

