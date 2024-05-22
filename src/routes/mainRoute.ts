import express from 'express';
import tvShowRoutes from './tvShowRoutes';
import movieRoutes from './movieRoutes';
import addNewUserRouter from './userRoutes';

const router = express.Router();

router.use('/tvShows', tvShowRoutes);
router.use('/movies', movieRoutes);
router.use('/addNewUser', addNewUserRouter);

export default router;
