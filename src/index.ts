import express, { Request, Response } from 'express';
import connectDB from './db';
import * as dotenv from 'dotenv';
import Routes from './routes/mainRoute';

// To load env variable from .env file
dotenv.config();

// To establish a mongoDB connection
connectDB();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use('/', Routes)

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
