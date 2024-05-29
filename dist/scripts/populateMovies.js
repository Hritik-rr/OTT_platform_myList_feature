"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Movie_1 = __importDefault(require("../models/Movie"));
const db_1 = __importDefault(require("../db"));
const mongoose_1 = __importDefault(require("mongoose"));
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
const populateMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        yield Movie_1.default.deleteMany({});
        console.log('Cleared existing data');
        yield Movie_1.default.insertMany(moviesData);
        console.log('Data script for movies successfully completed');
        yield mongoose_1.default.connection.close();
        console.log('Database connection closed');
    }
    catch (error) {
        console.error('Error populating data:', error);
        // Ensuring the connection is closed in case of error
        yield mongoose_1.default.connection.close();
    }
});
populateMovies();
