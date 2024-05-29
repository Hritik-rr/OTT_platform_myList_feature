import Movie from '../models/Movie';
import connectDB from '../db';
import mongoose from 'mongoose';


const moviesData = [
    {
      title: "Bang Bang",
      description: "A man tries to find the truth about human existence.",
      genres: ["Action", "SciFi"],
      releaseDate: "2016-07-16",
      director: "Christopher Nolan",
      actors: ["Keanu Reeves", "Ellen Page"]
    },
    {
      title: "Mystic River",
      description: "Three childhood friends are reunited by tragedy.",
      genres: ["Drama"],
      releaseDate: "2003-10-15",
      director: "Clint Eastwood",
      actors: ["Sean Penn", "Tim Robbins"]
    },
    {
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
      genres: ["Action", "Fantasy", "SciFi"],
      releaseDate: "2010-07-16",
      director: "Christopher Nolan",
      actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
    },
    {
      title: "The Matrix",
      description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
      genres: ["Action", "Comedy"],
      releaseDate: "1999-03-31",
      director: "The Wachowskis",
      actors: ["Keanu Reeves", "Laurence Fishburne"]
    },
    {
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      genres: ["Fantasy", "Drama", "SciFi"],
      releaseDate: "2014-11-07",
      director: "Christopher Nolan",
      actors: ["Matthew McConaughey", "Anne Hathaway"]
    }
];
  

const populateMovies = async () => {

    try {
        await connectDB();

        await Movie.deleteMany({});
        console.log('Cleared existing data');

        await Movie.insertMany(moviesData);
        console.log('Data script for movies successfully completed');

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error populating data:', error);
        // Ensuring the connection is closed in case of error
        await mongoose.connection.close();
    }
};
  
populateMovies();
