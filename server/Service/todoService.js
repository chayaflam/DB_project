import { executeQuery } from './db.js';
import { getQuery, getByParamQuery, addQuery, deleteQuery, updateQuery } from './queries.js'

export class TodoService {

    async getTodo(userId) {
        const queryTodo = getQuery("todos");
        const result = await executeQuery(queryTodo, [userId]);
        return result;
    }

    async getTodoByuserId(userId) {
        const queryTodo = getByParamQuery("todos", "userId");
        const result = await executeQuery(queryTodo, [userId]);
        result[0] ? console.log(`Getting todos of user ${userId} succeeded`) :
            console.log(`Getting todos of user ${userId} failed`);
        return result;
    }

    async addTodo(todo) {
        const queryTodo = addQuery("todos", "NULL," + "?,".repeat((Object.keys(todo).length)) + "1");
        const result = await executeQuery(queryTodo, Object.values(todo));
        result.insertId ? console.log('Todo added successfully') : console.log('Failed to add todo')
        return result;
    }

    async deleteTodo(todoId) {
        const queryTodo = deleteQuery("todos");
        const result = await executeQuery(queryTodo, [todoId]);
        result.changedRows ? console.log(`Deleting todo ${todoId} succeeded`) :
            console.log(`Deleting todo ${todoId} failed`);
        return result;
    }

    async updateTodo(todoId, todo) {
        const queryTodo = updateQuery("todos", Object.keys(todo));
        const result = await executeQuery(queryTodo, Object.values(todo).concat(todoId));
        result.changedRows ? console.log(`Updating todo ${todoId} succeeded`) :
            console.log(`Updating todo ${todoId} failed`);
        return result;
    }
}