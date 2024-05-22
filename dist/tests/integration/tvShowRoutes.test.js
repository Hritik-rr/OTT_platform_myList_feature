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
const mainRoute_1 = __importDefault(require("../../routes/mainRoute"));
const TVShow_1 = __importDefault(require("../../models/TVShow"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', mainRoute_1.default);
describe('TV Show Routes', () => {
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
        yield TVShow_1.default.deleteMany({});
    }));
    it('Should create a new TV Show data via POST /tvShows', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
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
    }));
});
