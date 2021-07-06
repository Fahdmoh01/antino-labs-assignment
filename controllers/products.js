'use strict';
const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');

//@desc Get All Products
//@route GET api/v1/products/
//@access Public
exports.getProducts = asyncHandler(async(req,res, next)=>{
    const products = await Product.find();
    
    res.status(200).json({
        success:true,
        count:products.length,
        data:products
    });
})

//@desc Get Single Product
//@route GET api/v1/products/:productid
//@access Public
exports.getProduct = asyncHandler(async(req,res, next)=>{

    const product = await Product.findById(req.params.productid);
    
       res.status(200).json({
            success:true,
            data:product
       });
    })

//@desc Create Product
//@route POST api/v1/products/
//@access Private
 exports.createProduct = asyncHandler(async(req,res, next)=>{

    const product = await Product.create(req.body);
     //console.log(req.body);
    
        res.status(201).json({
            success:true,
             data:product
           
         });
    })


//@desc Update Product
// //@route PUT api/v1/products/:productid
// //@access Private
exports.updateProduct = asyncHandler(async(req,res, next)=>{

let product = await Product.findById(req.params.productid);
        //console.log(req.body);
product = await Product.findOneAndUpdate(req.params.productid, req.body,{
         new:true,
         runValidators:true
     })
        
     res.status(201).json({
             success:true,
             data:product
           
         });
    })


//@desc Delete Product
//@route DELETE api/v1/products/:productid
//@access Private
exports.deleteProduct = asyncHandler(async(req,res, next)=>{

     const product = await Product.findById(req.params.productid);
        
     product.remove();
        res.status(200).json({
            success:true,
            data:{}
         });
     })