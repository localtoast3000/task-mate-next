#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug';
debug('backend:server');
import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import logger from 'morgan';
import chalk from 'chalk';
import connectToDatbase from '../db/mongo_db_connector.js';

// ROUTER IMPORTS
import authRouter from './routes/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.AUTH_PORT || '4000';
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

// ROUTERS MIDDLEWARE
app.use('/auth', authRouter);

// PORT LISTENER
app.listen(PORT, () => {
  console.log(`
${chalk.cyanBright('SERVER LISTENING ON PORT:')} ${chalk.whiteBright(PORT)}
`);
});
