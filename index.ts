import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB as string);
    console.log('Connected to mongoDB');
  } catch (error) {
    console.log(`${error} did not connect`);
  }
};

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  connect();
  console.log('Connected to backend');
});