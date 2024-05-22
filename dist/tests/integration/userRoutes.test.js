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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const date_fns_1 = require("date-fns");
const mainRoute_1 = __importDefault(require("../../routes/mainRoute"));
const User_1 = __importDefault(require("../../models/User"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', mainRoute_1.default);
describe('User Routes', () => {
    let mongoServer;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        yield mongoose_1.default.connect(uri);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.dropDatabase();
        yield mongoose_1.default.connection.close();
        yield mongoServer.stop();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.deleteMany({});
    }));
    it('Should create a new User data via POST /addNewUser', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
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
        const formattedWatchHistory = response.body.data.watchHistory.map((entry) => (Object.assign(Object.assign({}, entry), { watchedOn: (0, date_fns_1.formatISO)(new Date(entry.watchedOn), { representation: 'date' }) })));
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
    }));
});
