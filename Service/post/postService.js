
import { executeQuery } from '../db.js';
import { getPostQuery, getPostByIdQuery, addPostQuery, deletePostQuery, updatePostQuery } from './queryPost.js';
export class PostService {

    async getPost() {
        const queryPost = getPostQuery();
        const result = await executeQuery(queryPost);
        return result;
    }

    async getPostById(id) {
        const queryPost = getPostByIdQuery();
        const result = await executeQuery(queryPost, [id]);
        return result;
    }

    async addPost(post) {
        const queryPost = addPostQuery(post);
        const result = await executeQuery(queryPost, Object.values(post));
        return result;
    }

    async deletePost(postId) {
        const queryPost = deletePostQuery();
        const result = await executeQuery(queryPost, [postId]);
        return result;
    }

    async updatePost(postId) {
        const queryPost = updatePostQuery();
        const result = await executeQuery(queryPost, [postId]);
        return result;
    }

}