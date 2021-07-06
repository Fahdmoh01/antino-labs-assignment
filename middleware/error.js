'use strict';
const ErrorResponse = require('../utils/errorResponse');
//Handling mongoose errors.
const  errorHandler= (err, req, res, next) =>{
    let error = {...err};
    error.message = err.message;

    console.log(err);

    //Mongooes bad ObjectId
    if(err.name === 'CastError'){
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoes duplicate key
    if(err.code === 11000){
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message,400);
    }

    //Mongoose validation errror
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new Errorresponse(message,400);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message  || 'Server Error'
    })
}

module.exports = errorHandler;