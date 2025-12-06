import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { PORT } from './src/config/env';

import authRouter from './src/routes/auth.routes';
import taskRouter from './src/routes/task.routes';
import connectDB from './src/database/mongodb';
import errorMiddleware from './src/middlewares/error.middleware';
 
const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://taskforge-front.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean) as string[],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', taskRouter);

app.use(errorMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the TaskForge API!');
});

// Connect to database
connectDB();

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, async () => {
    console.log(`TaskForge API is running on port ${PORT}`);
  });
}

export default app;