import express, { Request, Response } from 'express';
import connectDB from './db';
import * as dotenv from 'dotenv';

// To load env variable from .env file
dotenv.config();

// To establish a mongoDB connection
connectDB();

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
