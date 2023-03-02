//create notification route
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import notificationController from "../controllers/notificationController.js";

//routes for notifications
router.post("/notification/create", auth, notificationController.createNotif); //create notification
router.get("/notification", auth, notificationController.getNotif); //get notification
router.delete("/notification", auth, notificationController.deleteNotif); //delete notification

export default router;