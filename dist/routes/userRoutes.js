"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controllers/UserController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/addNewUser', UserController_1.addUser);
router.get('/myList', UserController_1.getMyListAllUsers);
// Functional Requirement: Routes
router.get('/myList/:userId', UserController_1.getMyListItemsByUser);
router.patch('/modifyMyList/:userId', UserController_1.addToMyList);
router.delete('/modifyMyList/:userId', UserController_1.deleteFromMyList);
exports.default = router;
