
import { executeQuery } from '../db.js';
import { addPasswordQuery, updatePasswordQuery,getPasswordQuery } from './passwordQuery.js'

export class UserPasswordService {

    async getUserPassword(user) {
        console.log("user"+user.userId)
        const queryUserPassword = getPasswordQuery();
        const result = await executeQuery(queryUserPassword, Object.values(user));
        console.log("resulttttttt    "+result[0]['count(*)'])
        return result[0]['count(*)'];
    }

    async addUserPassword(user) {
        const queryUserPassword = addPasswordQuery();
        const result = await executeQuery(queryUserPassword, Object.values(user));
        return result;
    }

    async updateUserPassword(userPasswordId, userPassword) {
        const queryUserPassword = updatePasswordQuery("userPasswords", Object.keys(userPassword));
        const result = await executeQuery(queryUserPassword, Object.values(userPassword).concat(userPasswordId));
        return result;
    }

}