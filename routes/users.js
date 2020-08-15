const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const passport = require('passport');
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/signIn'}),userController.createSession);
router.get('/signIn',userController.signIn);
router.get('/profile',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/signOut',userController.destroySession);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signIn'}), userController.createSession);
module.exports = router;
