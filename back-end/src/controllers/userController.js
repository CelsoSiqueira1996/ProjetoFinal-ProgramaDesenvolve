import UserService from "../services/userService.js";

const userService = new UserService();

class UserController {
    static async createUser(req, res, next) {
        try{
            const user = await userService.createUser(req.body);
            res.status(201).send({message: 'User successfully created.', user});
        } catch(error) {
            next(error);
        }
    }

    static getUsers(req, res, next) {
        try{
            req.result = userService.getUsers();
            next();
        } catch(error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        try{
            const id = req.params.id;
            const user = await userService.getUserById(id);
            res.status(200).send(user);
        } catch(error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next) {
        const id = req.params.id;
        try{
            await userService.deleteUser(id);
            res.status(200).send({message: 'User successfully deleted.'});
        } catch(error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        const { id } = req.params;
        try{
            await userService.updateUser({ id, ...req.body });
            res.status(200).send({message: "User successfully updated."});
        } catch(error) {
            next(error);
        }
    }
}

export default UserController;