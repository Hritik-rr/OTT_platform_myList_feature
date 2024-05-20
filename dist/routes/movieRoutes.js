"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MovieController_1 = require("../controllers/MovieController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/movies', MovieController_1.addMovie);
exports.default = router;
