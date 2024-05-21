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
const movieRoutes_1 = __importDefault(require("../../routes/movieRoutes"));
const Movie_1 = __importDefault(require("../../models/Movie"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', movieRoutes_1.default);
describe('Movie Routes', () => {
    let mongoServer;
    jest.setTimeout(30000); // Set timeout to 30 seconds
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
        yield Movie_1.default.deleteMany({});
    }));
    it('Should create a new movie data via POST /movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
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
    }));
});
