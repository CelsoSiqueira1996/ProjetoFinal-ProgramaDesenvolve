import BaseError from "./baseError.js";

class PermissionLevelError extends BaseError {
    constructor(message='Usuário não tem permissão de acesso.') {
        super(401, message);
    }
}

export default PermissionLevelError;