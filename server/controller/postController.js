
const { response } = require("express");
const postModel=require("../model/post");
const jwt=require("jsonwebtoken");


  module.exports.getAllPost = async(req, res)=>{  
        try {
            let perPage = 5;
            
            let page = req.query.page || 1;
            const allPostData = await postModel.aggregate([{$sort: {createdOn: -1}}])
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec();
            const noOfDoc = await postModel.count();
            const nextPg = parseInt(page) + 1;
            const hasNextPg = nextPg <= Math.ceil(noOfDoc / perPage);
            res.render('index', {
                allPostData,
                current: page,
                nextPage: hasNextPg ? nextPg : null
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error unable to get the post");
        }      
            
    }

module.exports.getReadBlog= async (req,res)=>{
     
      const blogId= req.params.id;
      try{

            const data= await postModel.findById(blogId);
            res.render("readBlog",{data});
      }catch(error){
            res.status(500).send("Error unable to get the artical");
      }

  }

module.exports.getAddPost=async(req,res)=>{     
        res.render("admin/addPost")  ;      
  }

module.exports.postAddPost=async(req,res)=>{
    try{
        const blogTitle=req.body.blogTitle;     
        const blogContent=req.body.blogContent;
        const currentUser = res.locals.CurrentUser;
        const blogId=currentUser.id;
        const blogAuthor=currentUser.name;
        const createdOn = new Date();
        console.log("current user details : ", currentUser);
        const blogPostObj = await postModel.create({
            blogId,
            blogAuthor,
            blogTitle,
            blogContent,
            createdOn
    });
    res.redirect("/dashboard"); 
    }catch(error)
    {
        console.error(error);
          res.status(500).send("Error creating post");

    }
  }

module.exports.getDashboard=async(req,res)=>{ 
    try {
        const currentUser = res.locals.CurrentUser;
        console.log(currentUser);
        let perPage = 5;        
        let page = req.query.page || 1;
        const allPostData = await postModel
          .find({ blogId: currentUser.id })
          .sort({ createdOn: -1 })
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec();
        const noOfDoc = await postModel.countDocuments({ blogId: currentUser.id });
        const nextPg = parseInt(page) + 1;
        const hasNextPg = nextPg <= Math.ceil(noOfDoc / perPage);
        res.render('admin/dashboard', {
            allPostData,
            current: page,
            nextPage: hasNextPg ? nextPg : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error unable to get the post");
    }
    //getPosts(req, res, 'admin/dashboard');                
}

module.exports.postSearch=async(req,res)=>{
      const searchTerm=req.body.searchTerm;
      const pageValue = req.query.page;
      console.log(pageValue);
      try{
            const allPostData = await postModel.find({
                  $or: [
                    { blogTitle: { $regex: searchTerm, $options: 'i' } }, // 'i' for case-insensitive
                    { blogContent: { $regex: searchTerm, $options: 'i' } }
                  ]
                });
                if(pageValue==='index'){
                res.render("search",{allPostData});
                }
                else if(pageValue==='dash'){
                  res.render('admin/dashboard', {allPostData});
                }

      }  catch(error){
            res.status(500).send("Error..");
      }         
      }

module.exports.getEditPost=async(req,res)=>
      {
            const id=req.params.id;
            try{
                  const data=await postModel.findById(id);
                  res.render('admin/editPost',{data});
            }
            catch(error){
                  console.log(error);
            }
            
            
      }

module.exports.postEditPost = async (req, res) => {
    try {
        const blogTitle = req.body.blogTitle;
        const blogContent = req.body.blogContent;
        const edited = await postModel.findByIdAndUpdate(
            req.params.id,
            { blogTitle, blogContent, updatedOn: new Date() },
            { new: true }
        );

        if (!edited) {
            return res.status(404).json({ error: "Document not found" });
        }

        res.json(edited);
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.postDeletePost=async (req, res) => {
try{   
      const id=req.body._id;   
      const bolgObj=await postModel.findByIdAndRemove(id);
      res.redirect('/dashBoard');
}catch(error){
      console.error("Error updating document:", error);
      res.status(500).json({ error: "Internal Server Error" });
}

}





      


      