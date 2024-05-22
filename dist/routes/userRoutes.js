"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controllers/UserController");
const express_1 = require("express");
const router = (0, express_1.Router)();
const addNewUserRouter = router.post('/', UserController_1.addUser);
exports.default = addNewUserRouter;
