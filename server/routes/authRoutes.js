const express=require('express');
const router =express.Router();
const User=require("../model/user");
const authCtlr=require("../controller/authController");

router.get('/login', authCtlr.getLogin);
router.post('/login', authCtlr.postLogin);
router.get('/logout', authCtlr.getLogOut);


module.exports=router;