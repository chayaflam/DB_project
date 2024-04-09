import { TodoService } from '../Service/todoService.js'


export class TodoController {

    async getTodo(req, res, next) {
        try {
            const todoService = new TodoService();
            const resultItems = await todoService.getTodo(req.body)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getTodoById(req, res, next) {
        try {
            const todoService = new TodoService();
            const resultItem = await todoService.getTodoByuserId(req.query);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addTodo(req, res) {
        try {
            const todoService = new TodoService();
            const result = await todoService.addTodo(req.body);
            res.status(200).json({ status: 200, id: result.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteTodo(req, res) {
        try {
            const todoService = new TodoService();
            await todoService.deleteTodo(req.params.id);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateTodo(req, res) {
        try {
            const todoService = new TodoService();
            await todoService.updateTodo(req.params.id, req.body);
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