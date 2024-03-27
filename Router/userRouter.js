import express from "express";
import { UserController } from '../Controller/userController.js'


const userRouter = express.Router();
const userController = new UserController()


userRouter.get("/", userController.getUser)
userRouter.get("/:id", userController.getUserById)
userRouter.post("/", userController.postUser)

// userRouter.post('/', (req, res) => {
// })

export{
    userRouter
}





