import express from 'express';
import tvShowRoutes from './tvShowRoutes';
import movieRoutes from './movieRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/stage-ott/tvShows', tvShowRoutes);
router.use('/stage-ott/movies', movieRoutes);
router.use('/stage-ott/users', userRoutes);

export default router;
