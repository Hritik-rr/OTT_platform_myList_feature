import express from 'express';
import { addMovie } from '../controllers/MovieController';
import { Router } from 'express';

const router = Router();

router.post('/movies', addMovie);

export default router;