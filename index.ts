import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/auth';

const app = express();
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

app.listen(process.env.PORT, () => {
  connect();
  console.log('Connected to backend');
});
