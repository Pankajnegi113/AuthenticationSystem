const User=require('../models/user');
const bcrypt=require('bcrypt');
const passoword="xyz";

//storing user details in db when user click on signup
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        req.flash('success','Password/Confirm Password mismatch');
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log("Error in finding user in sign-up");
            return;
        }

        if(!user){
            //encrypting the user pwd and then storing user details in db
            var password=req.body.password;
            let hash = bcrypt.hashSync(password, 10);
            req.body.password=hash;
            //storing user details
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log("Error in creating user in sign-up ",err);
                    return;
                }
                req.flash('success',"Login to your new account")
                return res.redirect('/users/signIn')
            })
        }
        else{
            return res.redirect('back');
        }
    })
};

//redirecting to user profile, if he gives valid email and pwd while login
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    else{
        req.flash('success',"Email/Password mismatch");
        return res.render('signIn',{
            title:"Sign In"
        })
    }

}

//storing user id in cookie to manage session
module.exports.createSession=function(req,res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/users/profile');
}

//refirecting to user profile after validating user signIn
module.exports.profile=function(req,res){
    return res.render('profile',{
        title:"User-Profile",
        User:req.user
    })
}

//updating user password from user profile
module.exports.update=function(req,res){
     //encrypting the user new pwd and then updating it in db 
     var password=req.body.password;
     let hash = bcrypt.hashSync(password, 10);
    if(req.user.id==req.params.id &&  bcrypt.compareSync(req.body.oldpassword, req.user.password)){
        req.body.password=hash;
        User.findByIdAndUpdate({_id:req.params.id},{password:req.body.password},function(err,user){
            if(err)
            {
                req.flash('success',"Wrong old password");
                console.log("Error in updating password");
                return;
            }
          
            req.flash('success',"Password Updated Successfully");
            return res.redirect('/');
        })
       
    }
    else{
        return res.status(401).send('unauthorised');
    }
}

//on logout, redirecting to signin page again
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Logged out successfully!')
    return res.redirect('/users/signIn');
}