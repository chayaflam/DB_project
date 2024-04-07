import express from "express";
import { UserController } from '../Controller/userController.js'


const userRouter = express.Router();
const userController = new UserController()

userRouter.get("/", userController.getUser)
userRouter.get("/:username", userController.getUserByUsername)
userRouter.post("/", userController.addUser)
userRouter.delete("/:id", userController.deleteUser)
userRouter.put("/:username", userController.updateUser)
userRouter.put("/", userController.updatePassword)


export{
    userRouter
}





