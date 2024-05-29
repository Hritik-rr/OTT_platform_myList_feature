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
const User_1 = __importDefault(require("../models/User"));
const db_1 = __importDefault(require("../db"));
const mongoose_1 = __importDefault(require("mongoose"));
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
const populateUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        yield User_1.default.deleteMany({});
        console.log('Cleared existing data');
        yield User_1.default.insertMany(usersData);
        console.log('Data script for movies successfully completed');
        yield mongoose_1.default.connection.close();
        console.log('Database connection closed');
    }
    catch (error) {
        console.error('Error populating data:', error);
        yield mongoose_1.default.connection.close();
    }
});
populateUsers();
