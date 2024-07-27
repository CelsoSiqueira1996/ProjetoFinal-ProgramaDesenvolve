import BaseError from "./baseError.js";

class NotFoundError extends BaseError {
    constructor(message='Page not found') {
        super(404, message);
    }
}

export default NotFoundError;