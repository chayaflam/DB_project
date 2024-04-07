import { executeQuery } from './db.js';
import { getQuery, getByParamQuery, addQuery, deleteQuery, updateQuery } from './queries.js'

export class TodoService {

    async getTodo(userId) {
        const queryTodo = getQuery("todos");
        const result = await executeQuery(queryTodo, [userId]);
        return result;
    }

    async getTodoByuserId(userId) {
        const queryTodo = getByParamQuery("todos","userId");
        const result = await executeQuery(queryTodo, [userId]);
        return result;
    }

    async addTodo(todo) {
        const queryTodo = addQuery("todos", "NULL," + "?,".repeat((Object.keys(todo).length)) + "1");
        const result = await executeQuery(queryTodo, Object.values(todo));
        
        return result;
    }

    async deleteTodo(todoId) {
        const queryTodo = deleteQuery("todos");
        const result = await executeQuery(queryTodo, [todoId]);
        return result;
    }

    async updateTodo(todoId, todo) {
        const queryTodo = updateQuery("todos", Object.keys(todo));
        const result = await executeQuery(queryTodo, Object.values(todo).concat(todoId));
        return result;
    }

}