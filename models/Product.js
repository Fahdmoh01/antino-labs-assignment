'use strict';
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please add a  product name']
    },
    price:{
        type:Number,
        required:[true,'Please add a price'], 
    },
    resetPasswordToken:Date,
    resetPasswordExpire:Date
},
{
    timestamps:true
}
);

module.exports = mongoose.model('Product', ProductSchema);