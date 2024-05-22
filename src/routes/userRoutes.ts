import { addUser } from "../controllers/UserController";
import { Router } from "express";

const router = Router();

const addNewUserRouter = router.post('/', addUser);

export default addNewUserRouter;