import express from "express";
import { CommentController } from '../Controller/commentController.js'

const commentRouter = express.Router();
const commentController = new CommentController()


commentRouter.get("/", commentController.getComment)
commentRouter.get("/:id", commentController.getCommentById)
commentRouter.post("/", commentController.addComment)
commentRouter.delete("/:id", commentController.deleteComment)
commentRouter.put("/", commentController.updateComment)


export {
    commentRouter
}





