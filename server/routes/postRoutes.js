const express=require('express');
const router =express.Router();
const postModel=require("../model/post");
const postCtlr=require("../controller/postController");
const { restrictaccess } = require('../helper/restristAccess');
router.get("/", postCtlr.getAllPost);
router.post('/search', postCtlr.postSearch);
router.get('/readBlog/:id', postCtlr.getReadBlog);

router.get('/dashboard', restrictaccess, postCtlr.getDashboard);
router.get("/addPost", restrictaccess, postCtlr.getAddPost);
router.post("/addPost", restrictaccess, postCtlr.postAddPost);
router.get('/editPost/:id', postCtlr.getEditPost);
router.post('/editPost/:id', postCtlr.postEditPost);
router.post('/deletePost', postCtlr.postDeletePost);



module.exports=router;