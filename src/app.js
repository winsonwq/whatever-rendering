import express from 'express';
import path from 'path';
import {} from 'rxrouter';
import compression from 'compression';
import logger from 'express-bunyan-logger';
import { logConfig } from './utils/log';
import router from './routes/';
import {} from './routes/routes-hanlder';

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use(logger(logConfig));
app.use(express.static(path.join(__dirname, '../public')));

app.use(router);

export default app;
