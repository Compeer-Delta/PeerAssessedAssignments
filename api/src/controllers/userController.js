// Description: This file contains the functions that are used to handle the user routes
import User from "../schemas/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";

// create user
const createUser = async (req, res) => {
  const { password, firstname, surname, email, institutionName, role } =
    req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    password: bcrypt.hashSync(password, saltRounds),
    firstname,
    surname,
    email,
    institutionName,
    role,
  });
  try {
    const savedUser = await user.save();
    await Institution.updateOne(
      { name: institutionName },
      { $push: { users: email } }
    );
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const exists = await bcrypt.compare(password, user.password);
    if (!exists) {
      return res.status(402).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    /*const token = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 60, email: user.email },
      process.env.JWT_SECRET
    );*/
    console.log("logged in with:", token);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update user details
const updateUser = async (req, res) => {
  const { email, password, details, institutionName } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (password) {
      user.password = bcrypt.hashSync(password, saltRounds);
    }
    if (details) {
      user.details = details;
    }
    if (institutionName) {
      user.institutionName = institutionName;
    }
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get user
const getUser = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all users by institution
const getAllUsers = async (req, res) => {
	const { institutionName } = req.query;
	try {
		const users = await User.find({ institutionName: institutionName });
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
