import bcryptjs from 'bcryptjs';
import { users } from '../models/index.js'
import AlreadyExistsError from '../errors/alreadyExistsError.js';
import NotFoundError from '../errors/notFoundError.js';

class UserService {
    async createUser(dto) {
        try{
            const { password, name, email, cpf, birthdate, permission, cart } = dto;
            const CPF = cpf.replace(/\.|-/g, "");
            const user = await users.findOne({cpf:CPF});

            if(user) {
                throw new AlreadyExistsError('Usuário já existe.');
            }

            if(password) {
                var encryptedPassword = await bcryptjs.hash(password, 8);
            }

            const createdUser = await users.create({
                name,
                email,
                birthdate,
                cpf: CPF,
                password: encryptedPassword,
                permission: permission || 'user',
                cart: cart
            })

            return createdUser;

        } catch(error){
            throw error;
        }
    }

    getUsers() {
        try{
            const usersList = users.find().populate("cart.product");

            return usersList;
        } catch(error) {
            throw error;
        }
    }

    async getUserById(id) {
        try{
            const user = await users.findById(id).populate("cart.product");

            if(!user) {
                throw new NotFoundError('Usuário não encontrado.')
            }

            return user;
        } catch(error) {
            throw error;
        }
    }
 
    async deleteUser(id) {
        await this.getUserById(id);
        try {
            await users.findByIdAndDelete(id);
        } catch(error) {
            throw error;
        }
    }

    async updateUser(dto) {
        const { id, ...updates } = dto;
        await this.getUserById(id);
        try {
            await users.findByIdAndUpdate(id, updates, {runValidators: true})
        } catch(error) {
            throw error;
        }
    }
}

export default UserService;