import { addMovie } from '../controllers/MovieController';
import { Router } from 'express';

const router = Router();

const addMovieRouter = router.post('/', addMovie);

export default addMovieRouter;