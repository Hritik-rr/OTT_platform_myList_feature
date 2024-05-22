"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TVShowController_1 = require("../controllers/TVShowController");
const express_1 = require("express");
const router = (0, express_1.Router)();
const addTvShowRouter = router.post('/', TVShowController_1.addTVShow);
exports.default = addTvShowRouter;
