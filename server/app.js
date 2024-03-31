import express from 'express';
import { userRouter } from './Router/userRouter.js'
import { postRouter } from './Router/postRouter.js';
import { todoRouter } from './Router/todoRouter.js';
import { commentRouter } from './Router/commentRouter.js';
import { logErrors } from './MiddleWare/logError.js';

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/todos', todoRouter);
app.use('/posts/:postId/comments', commentRouter);
app.use('/posts', postRouter);
app.use(logErrors);


app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});