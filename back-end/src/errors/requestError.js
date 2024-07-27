import BaseError from "./baseError.js";

class RequestError extends BaseError {
    constructor(message='One or more provided data is incorrect.') {
        super(400, message);
    }
}

export default RequestError;