import BaseError from "./baseError.js";

class PermissionLevelError extends BaseError {
    constructor(message='User does not have access permission.') {
        super(401, message);
    }
}

export default PermissionLevelError;