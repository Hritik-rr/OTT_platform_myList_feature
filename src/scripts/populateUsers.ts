import User from '../models/User';
import connectDB from '../db';
import mongoose from 'mongoose';

const usersData = [
    {
      "username": "Alice Johnson",
      "preferences": {
        "favoriteGenres": ["Action", "SciFi"],
        "dislikedGenres": ["Romance", "Comedy"]
      },
      "watchHistory": [],
      "myList": []
    },
    {
      "username": "Bob Smith",
      "preferences": {
        "favoriteGenres": ["Drama"],
        "dislikedGenres": ["Romance", "Fantasy"]
      },
      "watchHistory": [],
      "myList": []
    },
    {
      "username": "Charlie Brown",
      "preferences": {
        "favoriteGenres": ["SciFi", "Comedy"],
        "dislikedGenres": ["Romance", "Horror"]
      },
      "watchHistory": [],
      "myList": []
    },
    {
      "username": "David Lee",
      "preferences": {
        "favoriteGenres": ["Action", "Fantasy"],
        "dislikedGenres": ["Drama", "Comedy"]
      },
      "watchHistory": [],
      "myList": []
    },
    {
      "username": "Ella Martinez",
      "preferences": {
        "favoriteGenres": ["Drama", "SciFi"],
        "dislikedGenres": ["Romance", "Comedy"]
      },
      "watchHistory": [],
      "myList": []
    }
];

const populateUsers = async () => {

    try {
        await connectDB();

        await User.deleteMany({});
        console.log('Cleared existing data');

        await User.insertMany(usersData);
        console.log('Data script for movies successfully completed');

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error populating data:', error);
        await mongoose.connection.close();
    }
};
  
populateUsers();
  