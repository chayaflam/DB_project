
import { executeQuery } from './db.js';
import { getQuery, getByParamQuery, addQuery, deleteQuery, updateQuery } from './queries.js';

export class PostService {

    async getPost(limit) {
        const queryPost = getQuery("posts");
        const result = await executeQuery(queryPost, [limit]);
        result[0] ? console.log(`Getting opsts succeeded`) :
            console.error(`Getting posts failed`);
        return result;
    }

    async getPostById(id) {
        const queryPost = getByParamQuery("posts", "id");
        const result = await executeQuery(queryPost, [id]);
        return result;
    }

    async addPost(post) {
        const queryPost = addQuery("posts", "NULL," + "?,".repeat((Object.keys(post).length)) + "1");
        const result = await executeQuery(queryPost, Object.values(post));
        result.insertId ? console.log('Post added successfully') : console.error('Failed to add post')
        return result;
    }

    async deletePost(postId) {
        const queryPost = deleteQuery("posts");
        const result = await executeQuery(queryPost, [postId]);
        result.changedRows ? console.log(`Deleting post ${postId} succeeded`) :
            console.error(`Deleting post ${postId} failed`);
        return result;
    }

    async updatePost(postId, post) {
        const queryPost = updateQuery("posts", Object.keys(post));
        const result = await executeQuery(queryPost, Object.values(post).concat(postId));
        result.changedRows ? console.log(`Updating post ${postId} succeeded`) :
            console.error(`Updating post ${postId} failed`);
        return result;
    }
}