import express from 'express';
import cors from "cors";
import { userRouter } from './Router/userRouter.js'
import { postRouter } from './Router/postRouter.js';
import { todoRouter } from './Router/todoRouter.js';
import { commentRouter } from './Router/commentRouter.js';
import { authRouter } from './Router/authRouter.js';
import { logErrors } from './MiddleWare/logError.js';

const app = express();
app.use(cors())
app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter)
app.use('/todos', todoRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use(logErrors);


app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});