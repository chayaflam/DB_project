import { executeQuery } from './db.js';
import { getQuery, getByParamQuery, addQuery, deleteQuery, updateQuery } from './queries.js'

export class TodoService {

    async getTodo(userId) {
        const queryTodo = getQuery("todos");
        const result = await executeQuery(queryTodo, [userId]);
        return result;
    }

    async getTodoByuserId(query) {
        const queryTodo = getByParamQuery("todos",query.sort);
       console.log(query.sort)

        const result = await executeQuery(queryTodo, [query.userId]);
        result[0] ? console.log(`Getting todos of user ${query.userId} succeeded`) :
            console.error(`Getting todos of user ${query.userId} failed`);
        return result;
    }

    async addTodo(todo) {
        const queryTodo = addQuery("todos", "NULL," + "?,".repeat((Object.keys(todo).length)) + "1");
        const result = await executeQuery(queryTodo, Object.values(todo));
        result.insertId ? console.log('Todo added successfully') : console.error('Failed to add todo')
        return result;
    }

    async deleteTodo(todoId) {
        const queryTodo = deleteQuery("todos");
        const result = await executeQuery(queryTodo, [todoId]);
        result.changedRows ? console.log(`Deleting todo ${todoId} succeeded`) :
            console.error(`Deleting todo ${todoId} failed`);
        return result;
    }

    async updateTodo(todoId, todo) {
        const queryTodo = updateQuery("todos", Object.keys(todo));
        const result = await executeQuery(queryTodo, Object.values(todo).concat(todoId));
        result.changedRows ? console.log(`Updating todo ${todoId} succeeded`) :
            console.error(`Updating todo ${todoId} failed`);
        return result;
    }
}