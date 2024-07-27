import jwt, { decode } from "jsonwebtoken";
import jsonSecret from "../config/jsonSecret.js";
import { inactiveTokens } from "../models/jwtToken.js";
import PermissionLevelError from "../errors/permissionLevelError.js";
import NotFoundError from "../errors/notFoundError.js";

async function authenticated(req, res, next) {
    const token = req.headers.authorization;
    try {
        if(!token) {
            throw new NotFoundError('Access token not provided.');
        }

        if(await inactiveTokens.findOne({token})) {
            throw new PermissionLevelError('Unauthorized user.');
        }

        const [, accessToken] = token.split(' ');

        if(!jwt.verify(accessToken, jsonSecret.secret)) {
            throw new PermissionLevelError('Unauthorized user.');
        }

        const { id, cpf } = decode(accessToken);
        req.userId = id;
        req.userCpf = cpf;
        next();
    } catch(error) {
        next(error);
    }
}

export default authenticated;