// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from './GenreTypes';

export interface IUser extends Document {
  // userId: number;
  username: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: Array<{
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }>;
  myList: Array<{
    itemId: string; // ID of the movie or TV show
    itemType: 'Movie' | 'TVShow'; // Type to distinguish between Movie and TVShow
  }>;
}

const UserSchema = new Schema<IUser>({
  // userId: { type: Number },
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: [{ type: String, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }],
    dislikedGenres: [{ type: String, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }]
  },
  watchHistory: [
    {
      contentId: { type: String, required: true },
      watchedOn: { type: Date, required: true },
      rating: { type: Number }
    }
  ],
  myList: [
    {
      itemId: { type: String, required: true },
      itemType: { type: String, enum: ['Movie', 'TVShow'], required: true }
    }
  ]
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
