import express from "express";
import { PostController } from '../Controller/postController.js'

const postRouter = express.Router();
const postController = new PostController()



postRouter.get("/", postController.getPost)
postRouter.get("/:id", postController.getPostById)
postRouter.post("/", postController.addPost)
postRouter.delete("/:id", postController.deletePost)
postRouter.put("/", postController.updatePost)


export{
     postRouter
}





