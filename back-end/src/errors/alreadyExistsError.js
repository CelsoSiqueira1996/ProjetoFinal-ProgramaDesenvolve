import RequestError from "./requestError.js";

class AlreadyExistsError extends RequestError {
    constructor(message='Recurso já existe.') {
        super(message);
    }
}

export default AlreadyExistsError;