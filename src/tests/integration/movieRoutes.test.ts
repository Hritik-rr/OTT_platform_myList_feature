import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import router from '../../routes/movieRoutes';
import Movie from '../../models/Movie';

const app = express();
app.use(express.json());
app.use('/', router);

describe('Movie Routes', () => {
    let mongoServer: MongoMemoryServer;

    // jest.setTimeout(30000); // Set timeout to 30 seconds
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
        await Movie.deleteMany({});
    });

    it('Should create a new movie data via POST /movies', async () => {
        const response = await request(app)
          .post('/movies')
          .send({
            title: "Inception",
            description: "A thief who enters the dreams of others to steal their secrets from their subconscious.",
            genres: ["Action", "SciFi"],
            releaseDate: "2010-07-16",
            director: "Christopher Nolan",
            actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
        });
    
        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.title).toBe("Inception");
        expect(response.body.data.description).toBe("A thief who enters the dreams of others to steal their secrets from their subconscious.");
        expect(response.body.data.genres).toEqual(["Action", "SciFi"]);
        expect(response.body.data.director).toBe("Christopher Nolan");
        expect(response.body.data.actors).toEqual(["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]);
    });
});
