import TVShow from '../models/TVShow';
import connectDB from '../db';
import mongoose from 'mongoose';

const tvShowsData = [
    {
      "title": "Breaking Bad",
      "description": "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to create and sell the drug.",
      "genres": ["Drama", "Action"],
      "episodes": [
        {
          "episodeNumber": 1,
          "seasonNumber": 1,
          "releaseDate": "2008-01-20",
          "director": "Vince Gilligan",
          "actors": ["Bryan Cranston", "Aaron Paul"]
        },
        {
          "episodeNumber": 2,
          "seasonNumber": 1,
          "releaseDate": "2008-01-27",
          "director": "Vince Gilligan",
          "actors": ["Bryan Cranston", "Aaron Paul"]
        }
      ]
    },
    {
      "title": "Friends",
      "description": "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
      "genres": ["Comedy", "Romance"],
      "episodes": [
        {
          "episodeNumber": 1,
          "seasonNumber": 1,
          "releaseDate": "1994-09-22",
          "director": "James Burrows",
          "actors": ["Jennifer Aniston", "Courteney Cox"]
        },
        {
          "episodeNumber": 2,
          "seasonNumber": 1,
          "releaseDate": "1994-09-29",
          "director": "James Burrows",
          "actors": ["Jennifer Aniston", "Courteney Cox"]
        }
      ]
    },
    {
      "title": "Stranger Things",
      "description": "A group of kids in a small town discover a mysterious girl, a series of bizarre events, and a government conspiracy.",
      "genres": ["Drama", "Fantasy", "Horror"],
      "episodes": [
        {
          "episodeNumber": 1,
          "seasonNumber": 1,
          "releaseDate": "2016-07-15",
          "director": "The Duffer Brothers",
          "actors": ["Winona Ryder", "David Harbour"]
        },
        {
          "episodeNumber": 2,
          "seasonNumber": 1,
          "releaseDate": "2016-07-15",
          "director": "The Duffer Brothers",
          "actors": ["Winona Ryder", "David Harbour"]
        }
      ]
    },
    {
      "title": "The Office",
      "description": "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
      "genres": ["Comedy"],
      "episodes": [
        {
          "episodeNumber": 1,
          "seasonNumber": 1,
          "releaseDate": "2005-03-24",
          "director": "Greg Daniels",
          "actors": ["Steve Carell", "Rainn Wilson"]
        },
        {
          "episodeNumber": 2,
          "seasonNumber": 1,
          "releaseDate": "2005-03-29",
          "director": "Greg Daniels",
          "actors": ["Steve Carell", "Rainn Wilson"]
        }
      ]
    },
    {
      "title": "Game of Thrones",
      "description": "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
      "genres": ["Drama", "Fantasy"],
      "episodes": [
        {
          "episodeNumber": 1,
          "seasonNumber": 1,
          "releaseDate": "2011-04-17",
          "director": "Tim Van Patten",
          "actors": ["Emilia Clarke", "Kit Harington"]
        },
        {
          "episodeNumber": 2,
          "seasonNumber": 1,
          "releaseDate": "2011-04-24",
          "director": "Tim Van Patten",
          "actors": ["Emilia Clarke", "Kit Harington"]
        }
      ]
    }
];

const populateTvShows = async () => {

    try {
        await connectDB();

        await TVShow.deleteMany({});
        console.log('Cleared existing data');

        await TVShow.insertMany(tvShowsData);
        console.log('Data script for TV Shows successfully completed');

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error populating data:', error);
        await mongoose.connection.close();
    }
};
  
populateTvShows();
  
  