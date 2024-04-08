
import { executeQuery } from '../db.js';
import { addPasswordQuery, updatePasswordQuery, getPasswordQuery } from './passwordQuery.js'

export class UserPasswordService {

    async getUserPassword(user) {
        const queryUserPassword = getPasswordQuery();
        const result = await executeQuery(queryUserPassword, Object.values(user));
        result[0]['count(*)'] ? console.log(`Getting password of ${user.userId} succeeded`) :
            console.log(`Getting password of ${user.userId} failed`);
        return result[0]['count(*)'];
    }

    async addUserPassword(user) {
        const queryUserPassword = addPasswordQuery();
        const result = await executeQuery(queryUserPassword, Object.values(user));
        result.insertId ? console.log('Password added successfully') : console.log('Failed to add password');
        return result;
    }

    async updateUserPassword(userPasswordId, userPassword) {
        const queryUserPassword = updatePasswordQuery("userPasswords", Object.keys(userPassword));
        const result = await executeQuery(queryUserPassword, Object.values(userPassword).concat(userPasswordId));
        result.changedRows ? console.log(`Updating userpassword succeeded`) :
            console.log(`Updating userpassword failed`);
        return result;
    }

}