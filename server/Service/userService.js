
import { executeQuery } from './db.js';
import {  getQuery, getByIdQuery, addQuery, deleteQuery, updateQuery } from './queries.js'

export class UserService {

    async getUser() {
        const queryUser = getQuery("users");
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserById(id) {
        const queryUser = getByIdQuery("users");
        const result = await executeQuery(queryUser, [id]);
        return result;
    }

    async addUser(user) {
        const queryUser = addQuery("users","?,".repeat((Object.keys(user).length)-1)+"?");
        const result = await executeQuery(queryUser, Object.values(user));
        return result;
    }

    async deleteUser(userId) {
        const queryUser = deleteQuery("users");
        const result = await executeQuery(queryUser, [userId]);
        return result;
    }

    async updateUser(user) {
        const queryUser = updateQuery("users",Object.keys(user));
        const result = await executeQuery(queryUser, Object.values(user).concat(user.id));
        return result;
    }
   
}