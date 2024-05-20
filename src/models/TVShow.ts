// src/models/TVShow.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from './GenreTypes';

export interface ITVShow extends Document {
  title: string;
  description: string;
  genres: Genre[];
  episodes: Array<{
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
  }>;
}

const TVShowSchema = new Schema<ITVShow>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }],
  episodes: [
    {
      episodeNumber: { type: Number, required: true },
      seasonNumber: { type: Number, required: true },
      releaseDate: { type: Date, required: true },
      director: { type: String, required: true },
      actors: [{ type: String }]
    }
  ]
});

const TVShow = mongoose.model<ITVShow>('TVShow', TVShowSchema);
export default TVShow;
