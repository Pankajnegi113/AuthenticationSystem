const express=require('express');
const db=require('./config/mongoose');

const app=express();
const port=8000;
app.use(express.urlencoded());
app.use(express.static('assets'));
app.set('view engine','ejs');
app.set('views','./views');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');
const passportGoogle=require('./config/passport_google_oath2');
const MongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware=require('./config/middleware');

//cookie-session management and mongoStore so that on restarting server user is still logged in
app.use(session({
    name:'authentication',
    secret:'somethingTemp',
    saveUninitialized:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log("Error in coonecting-mongodb setup ok")
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));

//running app on port 8000
app.listen(port,function(err){
    if(err)
    {
        console.log('error in running server',err);
        return;
    }
    console.log("Server is running at port ",port);
});