import express from "express";
import { CommentController } from '../Controller/commentController.js'

const commentRouter = express.Router();
const commentController = new CommentController()


commentRouter.get("/", commentController.getComment)
commentRouter.get("/:postId", commentController.getCommentById)
commentRouter.post("/:postId", commentController.addComment)
commentRouter.delete("/:id", commentController.deleteComment)
commentRouter.put("/:id", commentController.updateComment)


export {
    commentRouter
}





