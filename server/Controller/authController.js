import { UserService } from "../Service/userService.js";
import { UserPasswordService } from "../Service/userPassword/userPasswordService.js";
import { logErrors } from "../MiddleWare/logError.js";

export class AuthController {

    async getAuthLogin(req, res, next) {
        try {
            const authService = new UserService();
            const passwordService = new UserPasswordService();
            const resultItems = await authService.getUserByUsername(req.body.username);
            if (resultItems) {
                const resultCheckPassword = await passwordService.getUserPassword({ userId: resultItems.id, password: req.body.password })
                if (resultCheckPassword != 0) {
                    return res.status(200).json(resultItems);
                }
            }
            console.log("err");
            const err = { statusCode: 401, message: "Login failed" }
            return res.status(401).json(logErrors(err, req, res, next))
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getAuthRegister(req, res, next) {
        try {
            const authService = new UserService();
            const passwordService = new UserPasswordService();
            const resultItems = await authService.getUserByUsername(req.body.username);
            if (!resultItems) {
                const resultAddUser = await authService.addUser(req.body.username);
                const resultAddPassword = await passwordService.addUserPassword({ userId: resultAddUser.insertId ,password: req.body.password})
                if (resultAddPassword)
                    return res.status(200).json({ status: 200 ,id:resultAddUser.insertId});
            }
            console.error("err");
            const err = { statusCode: 409, message: "Registration failed" }
            return res.status(409).json(logErrors(err, req, res, next))
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}