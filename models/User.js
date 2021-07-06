'use strict';
const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please add a name']
    },
    email:{
        type:String,
        required:[true,'Please add an email'],
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid email']
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    password:{
        type:String,
        required:[true, 'Please add a password'],
        minlength: 6,
        select:false
        //select false ensures we do not select/show the password during API calls
    },
    resetPasswordToken:Date,
    resetPasswordExpire:Date
},
{
    timestamps:true
}
);


//Encrypt password using bcrypt
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = String(this.password);
    hashedPassword = await bcrypt.hash(hashedPassword, salt);
});

//sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
};

//Generate and hash password token
UserSchema.methods.getResetPasswordToken = function(){
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash token and set to resetPassword field
    this.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
    
    //set expire to 10mins
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};


//match User entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);