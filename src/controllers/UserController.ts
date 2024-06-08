import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Movie from '../models/Movie';
import TVShow from '../models/TVShow';

export const addUser = async (req: Request, res: Response) => {
    const { userId, username, preferences, watchHistory, myList } = req.body;
    try {
        const newUser: IUser = new User({
            userId,
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


export const getMyListAllUsers = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const users = await User.find({}, { userId: 1, myList: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            message: "Users' myLists retrieved successfully.",
            data: users,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                totalItems: totalUsers,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving users' myLists." });
    }
};

// Functional Requirement: Controller functions Below
export const getMyListItemsByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Applying pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedList = user.myList.slice(startIndex, endIndex);

        const detailedList = await Promise.all(
            paginatedList.map(async (item) => {
                if (item.itemType === 'Movie') {
                    return await Movie.findById(item.itemId).lean();
                } else if (item.itemType === 'TVShow') {
                    return await TVShow.findById(item.itemId).lean();
                }
                return null;
            })
        );

        res.status(200).json({
            message: "User's myList retrieved successfully.",
            data: detailedList,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(user.myList.length / limit),
                totalItems: user.myList.length,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving user's myList." });
    }
};


export const addToMyList = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { itemId, itemType } = req.body;

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if item already exists in myList
        const itemExists = user.myList.some((
            item: { 
                itemId: string, itemType: string 
            }) => item.itemId === itemId && item.itemType === itemType);
        

        if (itemExists) {
            return res.status(400).json({ message: "Item already exists in user's myList." });
        }

        // Add item to myList
        user.myList.push({ itemId, itemType });
        await user.save();
        
        res.status(200).json({
            message: "Item added to user's myList successfully.",
            data: user.myList,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding item to user's myList." });
    }
};


export const deleteFromMyList = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { itemId, itemType } = req.body;

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Checking if item exists in myList
        const itemIndex = user.myList.findIndex((item) => item.itemId === itemId && item.itemType === itemType);

        if (itemIndex === -1) {
            return res.status(400).json({ message: "Item does not exist in user's myList." });
        }

        // Removing item from myList
        user.myList.splice(itemIndex, 1);
        await user.save();
        
        res.status(200).json({
            message: "Item removed from user's myList successfully. Remaining myList items below.",
            data: user.myList,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error removing item to user's myList." });
    }
};
