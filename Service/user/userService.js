
import { executeQuery } from '../db.js';
import { getUserQuery, getUserByIdQuery, addUserQuery, deleteUserQuery, updateUserQuery } from './queryUser.js'

export class UserService {

    async getUser() {
        const queryUser = getUserQuery();
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserById(id) {
        const queryUser = getUserByIdQuery();
        const result = await executeQuery(queryUser, [id]);
        return result;
    }

    async addUser(user) {
        const queryUser = addUserQuery(user);
        const result = await executeQuery(queryUser, Object.values(user));
        return result;
    }

    async deleteUser(userId) {
        const queryUser = deleteUserQuery();
        const result = await executeQuery(queryUser, [userId]);
        return result;
    }

    async updateUser(user) {
        const queryUser = updateUserQuery();
        const result = await executeQuery(queryUser, Object.values(user).concat(user.id));
        return result;
    }

}