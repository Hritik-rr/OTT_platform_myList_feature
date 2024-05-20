// src/models/Movie.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from './types';

export interface IMovie extends Document {
  title: string;
  description: string;
  genres: Genre[];
  releaseDate: Date;
  director: string;
  actors: string[];
}

const MovieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }],
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String }]
});

const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
export default Movie;
