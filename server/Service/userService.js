
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
        const queryUser =    getByUsernameQuery("users", "userName");
        const result = await executeQuery(queryUser, [username]);
        result[0] ? console.log('user found - succeeded') : console.log('user not found');
        return result[0] ? result[0] : null;
    }

    async addUser(username) {
        const queryUser = addQuery("users", "NULL,'',?,'','',''");
        const result = await executeQuery(queryUser, [username]);
        result.insertId ? console.log('User added successfully') : console.log('Failed to add user')
        return result;
    }

    async deleteUser(userId) {
        const queryUser = deleteQuery("users");
        const result = await executeQuery(queryUser, [userId]);
        result.changedRows ? console.log(`Deleting user ${userId} succeeded`) :
        console.log(`Deleting user ${userId} failed`);
        return result;
    }

    async updateUser(user) {
        const queryUser = updateQuery("users", Object.keys(user));
        const result = await executeQuery(queryUser, Object.values(user).concat(user.id));
        result.changedRows ? console.log(`Updating user ${user.id} succeeded`) :
        console.log(`Updating user ${user.id} failed`);
        return result;
    }

    async updatePassword(user) {
        const queryUser = updatePasswordQuery();
        const result = await executeQuery(queryUser, Object.values(user))
        result.changedRows ? console.log(`Updating password of user ${user.userId} succeeded`) :
        console.log(`Updating password of user ${user.userId} failed`);
        return result;
    }
}