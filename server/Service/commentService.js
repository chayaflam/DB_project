
import { executeQuery } from './db.js';
import { getQuery, getByParamQuery, addQuery, deleteQuery, updateQuery } from './queries.js';
export class CommentService {

    async getComment() {
        const queryComment = getQuery("comments");
        const result = await executeQuery(queryComment);
        return result;
    }

    async getCommentById(postId) {
        const queryComment = getByParamQuery("comments", "postId");
        const result = await executeQuery(queryComment, [postId]);
        result[0] ? console.log(`Getting comment of post ${postId} succeeded`) :
            console.error(`Getting comment of post ${postId} failed`);
        return result;
    }

    async addComment(comment) {
        const queryComment = addQuery("comments", "NULL," + "?,".repeat((Object.keys(comment).length)) + "1");
        const result = await executeQuery(queryComment, Object.values(comment));
        result.insertId ? console.log('Commnet added successfully') : console.error('Failed to add comment')
        return result;
    }

    async deleteComment(commentId) {
        const queryComment = deleteQuery("comments");
        const result = await executeQuery(queryComment, [commentId]);
        result.changedRows ? console.log(`Deleting comment ${commentId} succeeded`) :
            console.error(`Deleting comment ${commentId} failed`);
        return result;
    }

    async updateComment(commentId, comment) {
        const queryComment = updateQuery("comments", Object.keys(comment));
        const result = await executeQuery(queryComment, Object.values(comment).concat(commentId));
        result.changedRows ? console.log(`Updating comment ${commentId} succeeded`) :
            console.error(`Updating comment ${commentId} failed`);
        return result;
    }
}