import express from "express";
import {getFeedUsers, updateEmailAddress, updatePassword, updateUserName} from "../controllers/users.js"

const router=express.Router();

/* READ */
router.get("/", getFeedUsers);

/* UPDATE */
router.post("/username", updateUserName);
router.post("/email", updateEmailAddress);
router.post("/password", updatePassword);

export default router;