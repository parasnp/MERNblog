const express=require('express');
const router =express.Router();
const User=require("../model/user");
const userCtlr=require("../controller/userController");



router.get('/registerUser', userCtlr.getRegisterUser);
router.post('/registerUser',userCtlr.postRegisterUser);


module.exports=router;