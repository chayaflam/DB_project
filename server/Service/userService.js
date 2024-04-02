
import { executeQuery } from './db.js';
import { getQuery, getByUsernameQuery, addQuery, deleteQuery, updateQuery } from './queries.js'
import { addPasswordQuery } from './userPassword/passwordQuery.js';

export class UserService {

    async getUser() {
        const queryUser = getQuery("users");
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserByUsername(username) {
        const queryUser = getByUsernameQuery("users");
        const result = await executeQuery(queryUser, [username]);
        console.log("result.id  "+result[0].id)
        return result[0];
    }

    async addUser(username) {
        const queryUser = addQuery("users",`NULL,"",?,"","",""`);
        const result = await executeQuery(queryUser, [username]);
        return result;
    }

    async deleteUser(userId) {
        const queryUser = deleteQuery("users");
        const result = await executeQuery(queryUser, [userId]);
        return result;
    }

    async updateUser(user) {
        const queryUser = updateQuery("users", Object.keys(user));
        const result = await executeQuery(queryUser, Object.values(user).concat(user.id));
        return result;
    }

}