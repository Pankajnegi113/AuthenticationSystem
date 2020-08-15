module.exports.home=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    else{
        return res.render('homeSignUp',{
            title:"SignUp Page"
        })
    }
}   