import express from 'express';
import UserController from '../controllers/userController.js';
import pagination from '../middlewares/pagination.js';
import permission from '../middlewares/permission.js';
import authenticated from '../middlewares/authenticated.js';
import AuthController from '../controllers/authController.js';

const userRoutes = express.Router();

userRoutes
    .get('/users', authenticated, permission('users'), UserController.getUsers, pagination)
    .post('/users', UserController.createUser)
    .delete('/users/id/:id', authenticated, permission('users'), UserController.deleteUser, AuthController.logoutUser)
    .put('/users/id/:id', authenticated, permission('users'), UserController.updateUser)
    .get('/users/id/:id', authenticated, permission('users'), UserController.getUserById);

export default userRoutes;