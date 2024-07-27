import mongoose from "mongoose";
import BaseError from "../errors/baseError.js";
import RequestError from "../errors/requestError.js";
import ValidationError from "../errors/validationError.js";

function errorHandler(error, req, res, next) {
    if(error instanceof mongoose.Error.ValidationError) {
        new ValidationError(error).sendAnswer(res);
    } else if(error instanceof mongoose.Error.CastError) {
        new RequestError().sendAnswer(res);
    } else if(error instanceof BaseError) {
        error.sendAnswer(res);
    } else {
        new BaseError().sendAnswer(res);
    }
} 

export default errorHandler;