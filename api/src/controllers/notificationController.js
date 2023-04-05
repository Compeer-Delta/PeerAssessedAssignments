// Description: This file contains the functions that will be used to create, get, and delete notifications
import Notification from "../schemas/notification.js";
import mongoose from "mongoose";

// create notification
const createNotif = async (req, res) => {
  const { userId, notifTitle, notifContent, urgency, assignmentId, moduleId } = req.body;
  const notification = new Notification({
    _id: new mongoose.Types.ObjectId(),
    userId: userId,
    notifTitle: notifTitle,
    notifContent: notifContent,
    urgency: urgency, //boolean
    assignmentId: assignmentId,
    moduleId: moduleId,
  });
  try {
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get notification by user id and message id
const getNotif = async (req, res) => {
  const { userId, messageId } = req.params;
  try {
    const notification = await Notification.findOne({
      userId: userId,
      messageId: messageId,
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all notifications by user id and module id
const getAllNotifications = async (req, res) => {
  const { userId, moduleId } = req.params;
  try {
    const notifications = await Notification.find({
      userId: userId,
      moduleId: moduleId
    });

    // if no notifications found, return 404 but if notifications found, return 201
    // (remember users will usually have no notifications)
    if (notifications.length === 0) {
      return res.status(404).json({ message: "No notifications found" });
    } else {
      res.status(201).json(notifications);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete notification by user id and message id
const deleteNotif = async (req, res) => {
  const { userId, messageId } = req.params;
  try {
    const notification = await Notification.findOneAndDelete({
      userId: userId,
      messageId: messageId,
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { createNotif, getNotif, deleteNotif, getAllNotifications };
