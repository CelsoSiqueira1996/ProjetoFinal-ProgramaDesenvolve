import express from "express";
import AuthController from "../controllers/authController.js";
import authenticated from "../middlewares/authenticated.js";
import permission from "../middlewares/permission.js";

const authRoutes = express.Router();

authRoutes
    .post('/auth/login', AuthController.loginUser)
    .post('/auth/logout/id/:id', authenticated, permission('auth'), AuthController.logoutUser)
    .get('/auth/tokens', authenticated, permission('auth'), AuthController.getTokens)
    .delete('/auth/tokens', authenticated, permission('auth'), AuthController.deleteExperidTokens);

export default authRoutes;