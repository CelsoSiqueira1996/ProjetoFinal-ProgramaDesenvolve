import NotFoundError from '../errors/notFoundError.js';
import PermissionLevelError from '../errors/permissionLevelError.js';
import { users } from '../models/index.js'

function permission(pathOrigin) {
    return async (req, res, next) => {
        try {
            const user = await users.findOne({
                cpf: req.userCpf
            });

            if(!user) {
                throw new NotFoundError('User does not exist.');
            }

            const permissionLevel = user.permission;

            if(pathOrigin == 'products' && permissionLevel == 'admin') {
                next();
            } else if(pathOrigin == 'users' && (permissionLevel == 'admin' || user._id == req.params.id)) {
                next()
            } else if(pathOrigin == 'auth' && (permissionLevel == 'admin' || user._id == req.params.id )) {
                next();
            } else {
                throw new PermissionLevelError();
            }
        } catch(error) {
            next(error);
        }
    }
}

export default permission;