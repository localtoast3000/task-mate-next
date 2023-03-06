#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug';
debug('backend:server');
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import logger from 'morgan';
import chalk from 'chalk';
import connectToDatbase from '../db/mongo_db_connector.js';

// ROUTER IMPORTS
import userRouter from './routes/user.js';
import tasksRouter from './routes/tasks.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.APP_PORT || '8000';
const STATIC = path.join(__dirname, 'public');
const app = express();

// DATABASE CONNECTOR
connectToDatbase().catch((err) => console.log(err));

// EXPRESS MIDDLEWARE CONFIG
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(STATIC));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

// ROUTERS MIDDLEWARE
app.use('/user', userRouter);
app.use('/tasks', tasksRouter);

// PORT LISTENER
app.listen(PORT, () => {
  console.log(`
${chalk.cyanBright('SERVER LISTENING ON PORT:')} ${chalk.whiteBright(PORT)}
`);
});
