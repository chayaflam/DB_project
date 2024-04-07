import { CommentService } from '../Service/commentService.js'


export class CommentController {

    async getComment(req, res, next) {
        try {
            const commentService = new CommentService();
            const resultItems = await commentService.getComment()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getCommentById(req, res, next) {
        try {
            const commentService = new CommentService();
            const resultItem = await commentService.getCommentById(req.params.postId);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addComment(req, res) {
        try {
            const commentService = new CommentService();
            const result = await commentService.addComment(req.body);
            res.status(200).json({ status: 200, id: result.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteComment(req, res) {
        try {
            const commentService = new CommentService();
            await commentService.deleteComment(req.params.id);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateComment(req, res) {
        try {
            const commentService = new CommentService();
            await commentService.updateComment(req.params.id, req.body);
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