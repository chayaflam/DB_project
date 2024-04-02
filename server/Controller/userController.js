import { UserService } from '../Service/userService.js'
import { UserPasswordService } from '../Service/userPassword/userPasswordService.js';

export class UserController {

    async getUser(req, res, next) {
        try {
            const userService = new UserService();
            const resultItems = await userService.getUser()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUserByUsername(req, res, next) {
        try {
            const userService = new UserService();
            const resultItem = await userService.getUserByUsername(req.params.username);
            console.log("resultItem  "+resultItem)
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addUser(req, res) {
        try {
            // if(req.body.password)
            const userService = new UserService();
            const passwordService = new UserPasswordService();
            const newUserId = await userService.addUser(req.body.username);
            await passwordService.addUserPassword({ id: newUserId.insertId, password: req.body.password });
            res.status(200).json({ status: 200 });
        }

        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteUser(req, res) {
        try {
            const userService = new UserService();
            await userService.deleteUser(req.params.id);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res) {
        try {
            const userService = new UserService();
            await userService.updateUser(req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}