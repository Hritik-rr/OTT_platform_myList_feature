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
exports.addTVShow = void 0;
const TVShow_1 = __importDefault(require("../models/TVShow"));
const addTVShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, genres, episodes } = req.body;
    try {
        const newTVShow = new TVShow_1.default({
            title,
            description,
            genres,
            episodes
        });
        yield newTVShow.save();
        res.status(201).json({
            message: "New TV show added to the collection.",
            data: newTVShow
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding TV show." });
    }
});
exports.addTVShow = addTVShow;
