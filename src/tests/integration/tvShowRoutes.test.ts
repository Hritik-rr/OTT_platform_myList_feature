import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import routes from '../../routes/mainRoute';
import TVShow from '../../models/TVShow';

const app = express();
app.use(express.json());
app.use('/', routes);

describe('TV Show Routes', () => {
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
        await TVShow.deleteMany({});
    });

    it('Should create a new TV Show data via POST /tvShows', async () => {
        const response = await request(app)
        .post('/tvShows')
        .send({
            title: "Example TV Show",
            description: "This is an example TV show description.",
            genres: ["Drama", "SciFi"],
            episodes: [
                {
                    episodeNumber: 1,
                    seasonNumber: 1,
                    releaseDate: "2024-01-01",
                    director: "Jane Doe",
                    actors: ["John Smith", "Mary Johnson"]
                },
                {
                    episodeNumber: 2,
                    seasonNumber: 1,
                    releaseDate: "2024-01-08",
                    director: "John Doe",
                    actors: ["John Smith", "Mary Johnson"]
                }
            ]
        });
    
        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.title).toBe("Example TV Show");
        expect(response.body.data.description).toBe("This is an example TV show description.");
        expect(response.body.data.genres).toEqual(["Drama", "SciFi"]);
        // expect(response.body.data.director).toBe("Christopher Nolan");
        // expect(response.body.data.actors).toEqual(["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]);
    });
});
