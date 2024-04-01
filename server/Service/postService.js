
import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, addQuery, deleteQuery, updateQuery } from './queries.js';
export class PostService {

    async getPost() {
        const queryPost = getQuery("posts");
        const result = await executeQuery(queryPost);
        return result;
    }

    async getPostById(id) {
        const queryPost = getByIdQuery("posts");
        const result = await executeQuery(queryPost, [id]);
        return result;
    }

    async addPost(post) {
        const queryPost = addQuery("posts","NULL,"+ "?,".repeat((Object.keys(post).length))+"1");
        const result = await executeQuery(queryPost, Object.values(post));
        return result;
    }

    async deletePost(postId) {
        const queryPost = deleteQuery("posts");
        const result = await executeQuery(queryPost, [postId]);
        return result;
    }

    async updatePost(postId, post) {
        const queryPost = updateQuery("posts", Object.keys(post));
        const result = await executeQuery(queryPost, Object.values(post).concat(postId));
        return result;
    }
}