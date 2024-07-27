import express from 'express';
import cors from 'cors';
import { connectionDB } from './config/connection-db.js';
import routes from "./routes/index.js";
import errorHandler from './middlewares/errorHandler.js';
import error404 from './middlewares/error404.js';

const connection = await connectionDB();

connection.on('error', (erro) => {
    console.error('connection error', erro)
});

connection.once('open', () => {
    console.log("Database connection succeed");
})

const app = express();
app.use(cors());
routes(app);
app.use(error404);
app.use(errorHandler);

export default app;


