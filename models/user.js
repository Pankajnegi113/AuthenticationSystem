const mongoose=require('mongoose');
const passport = require('passport');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
     },
    phone:{
        type:String,

    },
    gender:{
        type:String,
    }
    },
  {timeStamps:true}
);

const User=mongoose.model('User',userSchema);
module.exports=User;