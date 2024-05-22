import express from 'express';
import tvShowRoutes from './tvShowRoutes';
import movieRoutes from './movieRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/tvShows', tvShowRoutes);
router.use('/movies', movieRoutes);
router.use('/users', userRoutes);

export default router;
