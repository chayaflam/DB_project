
import { executeQuery } from './db.js';
import { getUserQuery, getUserByIdQuery, postUserQuery } from './queryUser.js'

export class UserService {

    async getUser() {
        const queryUser = getUserQuery();
        const result = await executeQuery(queryUser,"get");
        return result;
    }



    async getUserById(id) {
        const queryUser = getUserByIdQuery();
        const result = await executeQuery(queryUser, "get",[id]);
        return result;
    }

    async postUser(user) {
        const queryUser = postUserQuery(user);
        const result = await executeQuery(queryUser, "post", [user]);
        return result;
    }

}