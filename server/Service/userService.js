
import { executeQuery } from './db.js';
import { getQuery, getByUsernameQuery, addQuery, deleteQuery, updateQuery } from './queries.js'
import { updatePasswordQuery } from './userPassword/passwordQuery.js';

export class UserService {

    async getUser() {
        const queryUser = getQuery("users");
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserByUsername(username) {
        const queryUser = getByUsernameQuery("users", "userName");
        const result = await executeQuery(queryUser, [username]);
        return result[0] ? result[0] : null;
    }

    async addUser(username) {
        const queryUser = addQuery("users", "NULL,'',?,'','',''");
        const result = await executeQuery(queryUser, [username]);

        return result;
    }

    async deleteUser(userId) {
        console.log("update password user")
        const queryUser = deleteQuery("users");
        const result = await executeQuery(queryUser, [userId]);
        return result;
    }

    async updateUser(user) {
        console.log("update user details")
        const queryUser = updateQuery("users", Object.keys(user));
        const result = await executeQuery(queryUser, Object.values(user).concat(user.id));
        console.log(result)
        return result;
    }
    async updatePassword(user) {
        console.log("update user password")
        const queryUser = updatePasswordQuery();
        const result = await executeQuery(queryUser, Object.values(user)) 
        return result;
    }
}