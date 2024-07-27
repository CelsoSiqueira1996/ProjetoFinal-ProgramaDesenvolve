import AuthService from "../services/authService.js";

const authService = new AuthService();

class AuthController {
    static async loginUser(req, res, next) {
        try {
            const accessToken = await authService.loginUser(req.body);
            const created_at = new Date(); 
            res.status(201).send({ accessToken, created_at });
        } catch(error) {
            next(error);
        }
    }

    static async logoutUser(req, res, next) {
        const { created_at, accessToken } = req.body;
        try {
            await authService.logoutUser({created_at, accessToken})
            res.status(200).send({message: "Logout completed successfully."});
        } catch(error) {
            next(error)
        }
    }

    static async getTokens(req, res, net) {
        try {
            const tokens = await authService.getTokens();
            res.status(200).send(tokens);
        } catch(error) {
            next(error);
        }
    }

    static async deleteExperidTokens(req, res, next) {
        try {
            await authService.deleteExpiredTokens();
            res.status(200).send({message: "Experid tokens successfully deleted."});
        } catch(error) {
            next(error);
        }
    }
}

export default AuthController;