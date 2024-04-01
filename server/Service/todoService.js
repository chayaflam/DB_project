
import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, addQuery, deleteQuery, updateQuery } from './queries.js'

export class TodoService {

    async getTodo() {
        const queryTodo = getQuery("todos");
        const result = await executeQuery(queryTodo);
        return result;
    }

    async getTodoById(id) {
        const queryTodo = getByIdQuery("todos");
        const result = await executeQuery(queryTodo, [id]);
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