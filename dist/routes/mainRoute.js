"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tvShowRoutes_1 = __importDefault(require("./tvShowRoutes"));
const movieRoutes_1 = __importDefault(require("./movieRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = express_1.default.Router();
router.use('/tvShows', tvShowRoutes_1.default);
router.use('/movies', movieRoutes_1.default);
router.use('/addNewUser', userRoutes_1.default);
exports.default = router;
