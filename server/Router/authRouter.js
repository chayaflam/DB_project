import express from "express";
import { AuthController } from '../Controller/authController.js'

const authRouter = express.Router();
const authController = new AuthController()



authRouter.post("/login", authController.getAuthLogin)
authRouter.post("/register", authController.getAuthRegister)


export {
    authRouter
}





