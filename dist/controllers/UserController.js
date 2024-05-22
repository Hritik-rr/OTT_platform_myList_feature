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
exports.deleteFromMyList = exports.addToMyList = exports.getMyListItemsByUser = exports.getMyListAllUsers = exports.addUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Movie_1 = __importDefault(require("../models/Movie"));
const TVShow_1 = __importDefault(require("../models/TVShow"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, username, preferences, watchHistory, myList } = req.body;
    try {
        const newUser = new User_1.default({
            userId,
            username,
            preferences,
            watchHistory,
            myList
        });
        yield newUser.save();
        res.status(201).json({
            message: "New User added to the collection.",
            data: newUser
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding new User." });
    }
});
exports.addUser = addUser;
const getMyListAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const users = yield User_1.default.find({}, { userId: 1, myList: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const totalUsers = yield User_1.default.countDocuments();
        res.status(200).json({
            message: "Users' myLists retrieved successfully.",
            data: users,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                totalItems: totalUsers,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving users' myLists." });
    }
});
exports.getMyListAllUsers = getMyListAllUsers;
// Functional Requirement: Controller functions Below
const getMyListItemsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const user = yield User_1.default.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedList = user.myList.slice(startIndex, endIndex);
        const detailedList = yield Promise.all(paginatedList.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            if (item.itemType === 'Movie') {
                return yield Movie_1.default.findById(item.itemId).lean();
            }
            else if (item.itemType === 'TVShow') {
                return yield TVShow_1.default.findById(item.itemId).lean();
            }
            return null;
        })));
        res.status(200).json({
            message: "User's myList retrieved successfully.",
            data: detailedList,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(user.myList.length / limit),
                totalItems: user.myList.length,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving user's myList." });
    }
});
exports.getMyListItemsByUser = getMyListItemsByUser;
const addToMyList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { itemId, itemType } = req.body;
    try {
        const user = yield User_1.default.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Check if item already exists in myList
        const itemExists = user.myList.some((item) => item.itemId === itemId && item.itemType === itemType);
        if (itemExists) {
            return res.status(400).json({ message: "Item already exists in user's myList." });
        }
        // Add item to myList
        user.myList.push({ itemId, itemType });
        yield user.save();
        res.status(200).json({
            message: "Item added to user's myList successfully.",
            data: user.myList,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding item to user's myList." });
    }
});
exports.addToMyList = addToMyList;
const deleteFromMyList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { itemId, itemType } = req.body;
    try {
        const user = yield User_1.default.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Check if item exists in myList
        const itemIndex = user.myList.findIndex((item) => item.itemId === itemId && item.itemType === itemType);
        if (itemIndex === -1) {
            return res.status(400).json({ message: "Item does not exist in user's myList." });
        }
        // Remove item from myList
        user.myList.splice(itemIndex, 1);
        yield user.save();
        res.status(200).json({
            message: "Item removed from user's myList successfully. Remaining myList items below.",
            data: user.myList,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error removing item to user's myList." });
    }
});
exports.deleteFromMyList = deleteFromMyList;
