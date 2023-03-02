import Notification from "../schemas/notification.js";
import mongoose from "mongoose";

const createNotif = async (req, res) => {
  const { userId, messageId, notifTitle, notifContent, urgency } = req.body;
  const notification = new Notification({
    _id: new mongoose.Types.ObjectId(),
    messageId: messageId,
    userId: userId,
    notifTitle: notifTitle,
    notification: notifContent,
    urgency: urgency, //boolean
  });
  try {
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

export default { createNotif, getNotif, deleteNotif };
