const express=require('express');
const router=express.Router();
const homeController=require('../controllers/homeController');
const userController=require('../controllers/userController');
const passport = require('passport');
router.get('/',homeController.home);
router.use('/users',require('./users'));
module.exports=router;