import { addTVShow } from "../controllers/TVShowController";
import { Router } from "express";

const router = Router();

const addTvShowRouter = router.post('/', addTVShow);

export default addTvShowRouter;