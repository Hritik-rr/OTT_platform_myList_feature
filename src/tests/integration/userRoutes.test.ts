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
    jest.setTimeout(35000);
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

    it('Should create a new User data via POST /users/addNewUser', async () => {

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

        // Formatting the watchedOn dates before comparing
        const formattedWatchHistory = response.body.data.watchHistory.map((entry: any) => ({
            ...entry, watchedOn: formatISO(new Date(entry.watchedOn), { representation: 'date' })
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

    it('Should retrieve user myList via GET /users/myList/:userId', async () => {
        // Step 1: Adding a movie to the collection
        const movieResponse = await request(app)
            .post('/movies')
            .send({
                title: "Twilight",
                description: "A man tries to find the truth about human exitence.",
                genres: ["Action", "SciFi"],
                releaseDate: "2016-07-16",
                director: "Christopher Nolan",
                actors: ["Keanu Reeves", "Ellen Page"]
            });

        expect(movieResponse.status).toBe(201);
        const movie = movieResponse.body.data;

        // Step 2: Adding a TVShow to the collection
        const tvShowResponse = await request(app)
            .post('/tvShows')
            .send({
                title: "How I Met your Mother",
                description: "This is an example TV show description.",
                genres: ["Drama", "Fantasy"],
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

        expect(tvShowResponse.status).toBe(201);
        const tvShow = tvShowResponse.body.data;

        // Step 3: Add a user with the movie and TV show in their myList
        const userResponse = await request(app)
            .post('/users/addNewUser')
            .send({
                username: "John Doe",
                preferences: {
                    favoriteGenres: ["Action", "SciFi"],
                    dislikedGenres: ["Romance", "Comedy"]
                },
                watchHistory: [],
                myList: [
                    { itemId: movie._id, itemType: "Movie" },
                    { itemId: tvShow._id, itemType: "TVShow" }
                ]
            });

        expect(userResponse.status).toBe(201);
        const user = userResponse.body.data;

        // Step 4: Retrieve the user's myList
        const response = await request(app).get(`/users/myList/${user.userId}`);

        // Step 5: Validate the response
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User's myList retrieved successfully.");
        expect(response.body.data).toEqual([
            {
                _id: movie._id,
                title: "Twilight",
                description: "A man tries to find the truth about human exitence.",
                genres: ["Action", "SciFi"],
                releaseDate: "2016-07-16T00:00:00.000Z",
                director: "Christopher Nolan",
                actors: ["Keanu Reeves", "Ellen Page"],
                __v: 0
            },
            {
                _id: tvShow._id,
                title: "How I Met your Mother",
                description: "This is an example TV show description.",
                genres: ["Drama", "Fantasy"],
                episodes: [
                    {
                        episodeNumber: 1,
                        seasonNumber: 1,
                        releaseDate: "2024-01-01T00:00:00.000Z",
                        director: "Jane Doe",
                        actors: ["John Smith", "Mary Johnson"],
                        _id: tvShow.episodes[0]._id
                    },
                    {
                        episodeNumber: 2,
                        seasonNumber: 1,
                        releaseDate: "2024-01-08T00:00:00.000Z",
                        director: "John Doe",
                        actors: ["John Smith", "Mary Johnson"],
                        _id: tvShow.episodes[1]._id
                    }
                ],
                __v: 0
            }
        ]);
        expect(response.body.pagination).toEqual({
            currentPage: 1,
            totalPages: 1,
            totalItems: 2
        });
    });    

    it('Should modify user\'s myList by adding values via PATCH /users/modifyMyList/:userId', async () => {
        const user = {
            userId: 'd313eea9-b327-46c1-a9c6-057464e781de',
            username: 'Test User',
            preferences: {
                favoriteGenres: ['Action', 'SciFi'],
                dislikedGenres: ['Romance', 'Comedy']
            },
            watchHistory: [
                {
                    contentId: '664d568921972e80848ecb78',
                    watchedOn: '2024-01-15',
                    rating: 4
                },
                {
                    contentId: '664c9c37f04d0f8b0a64e492',
                    watchedOn: '2024-01-16'
                }
            ],
            myList: [
                {
                    itemId: '664c9c37f04d0f8b0a64e492',
                    itemType: 'Movie'
                },
                {
                    itemId: '664d5a5265a9bfb557bc6e35',
                    itemType: 'TVShow'
                }
            ]
        };

        // Finding the data on the basis of userId
        await User.findOneAndUpdate({ userId: user.userId }, user, { upsert: true });

        // JSON request body
        const requestBody = {
            itemId: '664dd3e2d3023d5c869bd2b1',
            itemType: 'TVShow'
        };

        // Making PATCH request to modify user's myList
        const response = await request(app)
            .patch(`/users/modifyMyList/${user.userId}`)
            .send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Item added to user's myList successfully.");
        expect(response.body.data).toHaveLength(3); 
    });    

    it('Should modify user\'s myList by deleting values via PATCH /users/modifyMyList/:userId', async () => {
        const user = {
            userId: 'd313eea9-b327-46c1-a9c6-057464e781de',
            username: 'Test User',
            preferences: {
                favoriteGenres: ['Action', 'SciFi'],
                dislikedGenres: ['Romance', 'Comedy']
            },
            watchHistory: [
                {
                    contentId: '664d568921972e80848ecb78',
                    watchedOn: '2024-01-15',
                    rating: 4
                },
                {
                    contentId: '664c9c37f04d0f8b0a64e492',
                    watchedOn: '2024-01-16'
                }
            ],
            myList: [
                {
                    itemId: '664c9c37f04d0f8b0a64e492',
                    itemType: 'Movie'
                },
                {
                    itemId: '664d5a5265a9bfb557bc6e35',
                    itemType: 'TVShow'
                },
                {
                    itemId: '664dd3e2d3023d5c869bd2b1',
                    itemType: 'TVShow'
                }
            ]
        };
    
        // Finding the data on the basis of userId
        await User.findOneAndUpdate({ userId: user.userId }, user, { upsert: true });
    
        // JSON request body
        const requestBody = {
            itemId: '664dd3e2d3023d5c869bd2b1',
            itemType: 'TVShow'
        };
    
        // Sending the DELETE request to remove item from user's myList
        const response = await request(app)
            .delete(`/users/modifyMyList/${user.userId}`)
            .send(requestBody);
    
        // Assertions
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Item removed from user's myList successfully. Remaining myList items below.");
        expect(response.body.data).toHaveLength(2); 
    });    
});