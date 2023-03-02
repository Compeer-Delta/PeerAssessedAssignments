//create notification route
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import notificationController from "../controllers/notificationController.js";

//routes for notifications
router.post("/notification/create", auth.authUser, notificationController.createNotif); //create notification
router.get("/notification/:id", auth.authUser, notificationController.getNotif); //get notification

export default router;