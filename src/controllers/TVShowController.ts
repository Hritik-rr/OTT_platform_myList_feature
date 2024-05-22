import { Request, Response } from 'express';
import TVShow, { ITVShow } from '../models/TVShow';

export const addTVShow = async (req: Request, res: Response) => {
    const { title, description, genres, episodes } = req.body;
    
    try {
        const newTVShow: ITVShow = new TVShow({
            title,
            description,
            genres,
            episodes
        });
        
        await newTVShow.save();
        res.status(201).json({
            message: "New TV show added to the collection.",
            data: newTVShow
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding TV show." });
    }
};

