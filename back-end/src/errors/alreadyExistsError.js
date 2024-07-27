import RequestError from "./requestError.js";

class AlreadyExistsError extends RequestError {
    constructor(message='Resource already exists.') {
        super(message);
    }
}

export default AlreadyExistsError;