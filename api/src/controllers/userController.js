import User from "../schemas/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";

// create user
const createUser = async (req, res) => {
  const { password, details: { firstname, surname, email }, institution, role } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    password: bcrypt.hashSync(password, saltRounds),
    details: { firstname, surname, email },
    institution,
    role,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const exists = await bcrypt.compare(password, user.password);
    if (!exists) {
      return res.status(402).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update user details
const updateUser = async (req, res) => {
  const { password, details, institution } = req.body;
  const userId = req.user.userId;
  try {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (password) {
      user.password = bcrypt.hashSync(password, saltRounds);
    }
    if (details) {
      user.details = details;
    }
    if (institution) {
      user.institution = institution;
    }
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  loginUser,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};
