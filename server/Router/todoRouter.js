import express from "express";
import { TodoController } from '../Controller/todoController.js'

const todoRouter = express.Router();
const todoController = new TodoController()



todoRouter.get("/", todoController.getTodo)
todoRouter.get("/:userId", todoController.getTodoById)
todoRouter.post("/", todoController.addTodo)
todoRouter.delete("/:id", todoController.deleteTodo)
todoRouter.put("/:id", todoController.updateTodo)


export{
     todoRouter
}





