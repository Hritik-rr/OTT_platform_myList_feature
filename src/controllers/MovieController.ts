import { Request, Response } from 'express';
import Movie, {IMovie} from '../models/Movie';

export const addMovie = async (req: Request, res: Response) => {
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
  
      // testing comment
      await newMovie.save();
      res.status(201).json({
        message: "New data added in Movies collection.",
        data: newMovie
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Error" });
    }
};