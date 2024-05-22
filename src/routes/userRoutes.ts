import { addUser, getMyListItemsByUser, getMyListAllUsers, addToMyList, deleteFromMyList } from "../controllers/UserController";
import { Router } from "express";

const router = Router();

router.post('/addNewUser', addUser);
router.get('/myList', getMyListAllUsers);

// Functional Requirement: Routes
router.get('/myList/:userId', getMyListItemsByUser); 
router.patch('/modifyMyList/:userId', addToMyList);
router.delete('/modifyMyList/:userId', deleteFromMyList);

export default router;