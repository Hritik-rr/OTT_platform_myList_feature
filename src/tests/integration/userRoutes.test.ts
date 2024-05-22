import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { formatISO } from 'date-fns';
import routes from '../../routes/mainRoute';
import User from '../../models/User';

const app = express();
app.use(express.json());
app.use('/', routes);

describe('User Routes', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('Should create a new User data via POST /addNewUser', async () => {
        const response = await request(app)
        .post('/users/addNewUser')
        .send({
            username: "Victoria Bekcham",
            preferences: {
                favoriteGenres: ["Action", "SciFi"],
                dislikedGenres: ["Romance", "Comedy"]
            },
            watchHistory: [
                {
                  contentId: "664d568921972e80848ecb78",
                  watchedOn: "2024-01-15",
                  rating: 4
                },
                {
                  contentId: "664c9c37f04d0f8b0a64e492",
                  watchedOn: "2024-01-16"
                }      
            ],
            myList: [
                {
                    "itemId": "664c9c37f04d0f8b0a64e492",
                    "itemType": "Movie"
                },
                {
                    "itemId": "664d5a5265a9bfb557bc6e35",
                    "itemType": "TVShow"
                } 
            ]
        });
    
        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.username).toBe("Victoria Bekcham");
        expect(response.body.data.preferences).toEqual({
            favoriteGenres: ["Action", "SciFi"],
            dislikedGenres: ["Romance", "Comedy"]
        });
        expect(response.body.data.myList).toEqual([
            {
                _id: expect.any(String),
                itemId: "664c9c37f04d0f8b0a64e492",
                itemType: "Movie"
            },
            {
                _id: expect.any(String),
                itemId: "664d5a5265a9bfb557bc6e35",
                itemType: "TVShow"
            }        
        ]);

        // Format the watchedOn dates before comparing
        const formattedWatchHistory = response.body.data.watchHistory.map((entry: any) => ({
            ...entry,
            watchedOn: formatISO(new Date(entry.watchedOn), { representation: 'date' })
        }));

        expect(formattedWatchHistory).toEqual([
            {
                _id: expect.any(String),
                contentId: "664d568921972e80848ecb78",
                watchedOn: "2024-01-15",
                rating: 4
            },
            {
                _id: expect.any(String),
                contentId: "664c9c37f04d0f8b0a64e492",
                watchedOn: "2024-01-16"
            }
        ]);
    });
});