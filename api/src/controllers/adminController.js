import Admin from "../schemas/admin.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";

// create admin
const createAdmin = async (req, res) => {
  const { adminId, password } = req.body;
  const admin = new Admin({
    _id: new mongoose.Types.ObjectId(),
    adminId: adminId,
    password: bcrypt.hashSync(password, saltRounds),
  });
  try {
    const savedAdmin = await admin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(402).json({ message: "Incorrect username or password" });
    }

    const payload = { adminId: admin.adminId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ admin, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ adminId: req.admin.adminId });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const deletedAdmin = await Admin.deleteOne({ adminId: adminId });
    res.status(200).json(deletedAdmin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { createAdmin, loginAdmin, getAdmin, deleteAdmin};
