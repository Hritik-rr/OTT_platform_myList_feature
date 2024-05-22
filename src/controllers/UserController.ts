import { Request, Response } from 'express';
import User, {IUser} from '../models/User';

export const addUser = async (req: Request, res: Response) => {
    const { username, preferences, watchHistory, myList } = req.body;
    try {
        const newUser: IUser = new User({
            username,
            preferences,
            watchHistory,
            myList
        });
        
        await newUser.save();
        res.status(201).json({
            message: "New User added to the collection.",
            data: newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding new User." });
    }
};

