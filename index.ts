import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction, Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/auth';
import { ResponseError } from './types/error';

const app: Application = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL || '');
    console.log('Connected to mongoDB');
  } catch (error) {
    console.log(`${error} did not connect`);
  }
};

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoute);

app.use(
  (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    const errorStatus: number = err.status || 500;
    const errorMessage: string = err.message || 'Something went wrong!';
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  }
);

app.listen(process.env.PORT, () => {
  connect();
  console.log('Connected to backend');
});
