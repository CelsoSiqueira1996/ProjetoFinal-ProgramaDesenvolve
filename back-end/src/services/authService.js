import { inactiveTokens, users } from "../models/index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import jsonSecret from "../config/jsonSecret.js";
import NotFoundError from "../errors/notFoundError.js";
import RequestError from "../errors/requestError.js";
import dayjs from "dayjs";

class AuthService {
    async loginUser(dto) {
        const { cpf, password } = dto;
        try {
            const CPF = cpf.replace(/\.|-/g, "");
            if(!(CPF && password)) {
                throw new RequestError('CPF and password are required.')
            }

            const user = await users.findOne({cpf:CPF});

            if(!user) {
                throw new NotFoundError('User does not exist.');
            }

            const checkPassword = await bcryptjs.compare(password, user.password);
            if(!checkPassword) {
                throw new RequestError('Invalid user or password.')
            }

            const accessToken = jwt.sign({
                id: user._id,
                cpf: CPF,
                name: user.name,
                permission: user.permission
            }, jsonSecret.secret, {expiresIn: 86400});

            return accessToken;
        } catch(error) {
            throw error;
        }
    }

    async logoutUser(dto) {
        const { accessToken, created_at } = dto;
        try {
            await inactiveTokens.create({
                token: accessToken,
                created_at
            });
        } catch(error) {
            throw error;
        }
    }

    async getTokens() {
        try {
            const tokens = await inactiveTokens.find();

            return tokens;
        } catch(error) {
            throw error;
        }
    }

    async deleteExpiredTokens() {
        try {
            const date = new Date(dayjs(new Date()).subtract(1, 'day'));
            await inactiveTokens.deleteMany({
                created_at: {
                    $lte: date
                }
            });
        } catch(error) {
            throw error;
        }
    }
}

export default AuthService;