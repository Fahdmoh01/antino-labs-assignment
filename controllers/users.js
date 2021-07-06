'use strict';
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

//@desc Get All Users
//@route GET api/v1/users/
//@access Public
exports.getUsers = asyncHandler(async(req,res, next)=>{
    const users = await User.find({});
    
    res.status(200).json({
        success:true,
        count:users.length,
        data:users
    });
})
