import BaseError from "./baseError.js";

class RequestError extends BaseError {
    constructor(message='Um ou mais dados fornecidos estão incorretos.') {
        super(400, message);
    }
}

export default RequestError;