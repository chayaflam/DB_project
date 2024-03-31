import express from 'express';
import { userRouter } from './Router/userRouter.js'
import { postRouter } from './Router/postRouter.js';
import { logErrors } from './MiddleWare/logError.js';

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use(logErrors);



app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});