import express, { Request, Response } from 'express';
import connectDB from './db';
import * as dotenv from 'dotenv';
import Movie, {IMovie} from '../src/models/Movie';

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

app.post('/movies', async (req: Request, res: Response) => {
  const { title, description, genres, releaseDate, director, actors } = req.body;

  console.log(req.body);
  try {
    const newMovie: IMovie = new Movie({
      title,
      description,
      genres,
      releaseDate,
      director,
      actors
    });

    await newMovie.save();
    res.status(201).json({
      message: "New data added in Movies collection.",
      data: newMovie
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
