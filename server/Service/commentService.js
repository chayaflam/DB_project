
import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, addQuery, deleteQuery, updateQuery } from './queries.js';
export class CommentService {

    async getComment() {
        const queryComment = getQuery("comments");
        const result = await executeQuery(queryComment);
        return result;
    }

    async getCommentById(id) {
        const queryComment = getByIdQuery("comments");
        const result = await executeQuery(queryComment, [id]);
        return result;
    }

    async addComment(comment) {
        const queryComment = addQuery("comments","NULL,"+ "?,".repeat((Object.keys(comment).length))+"1");
        const result = await executeQuery(queryComment, Object.values(comment));
        return result;
    }

    async deleteComment(commentId) {
        const queryComment = deleteQuery("comments");
        const result = await executeQuery(queryComment, [commentId]);
        return result;
    }

    async updateComment(commentId, comment) {
        const queryComment = updateQuery("comments", Object.keys(comment));
        const result = await executeQuery(queryComment, Object.values(comment).concat(commentId));
        return result;
    }
}