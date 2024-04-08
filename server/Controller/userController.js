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
            const userService = new UserService();
            const passwordService = new UserPasswordService();
            const newUserId = await userService.addUser(req.body.username);
            await passwordService.addUserPassword({ userId: newUserId.insertId, password: req.body.password });
            res.status(200).json({ status: 200, id: newUserId.insertId });
            newUserId ? console.log("add user") : console.error("can't insert user")
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

    async updatePassword(req, res) {
        try {
            const userService = new UserService();
            const result = await userService.updatePassword(req.body);
            if (!result) {
                const err = { statusCode: 405, message: " validation error" }
                // console.error(err)
                return res.status(405).json(logErrors(err, req, res, next));
            }
            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}