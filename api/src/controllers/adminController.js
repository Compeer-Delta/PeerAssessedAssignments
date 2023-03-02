import Admin from "../schemas/admin.js";
import User from "../schemas/user.js";
import Institution from "../schemas/institution.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";

// create admin
const createAdmin = async (req, res) => {
  const { password, institution, firstname, surname, email } = req.body;
  const admin = new Admin({
    _id: new mongoose.Types.ObjectId(),
    password: bcrypt.hashSync(password, saltRounds),
    firstname,
    surname,
    email,
    institution,
  });
  try {
    const savedAdmin = await admin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res
        .status(401)
        .json({ message: "Incorrect email or password" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(402)
        .json({ message: "Incorrect email or password" });
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

// get a specific admin's details
const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ adminId: req.admin.adminId });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete existing admin
const deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const deletedAdmin = await Admin.deleteOne({ adminId: adminId });
    res.status(200).json(deletedAdmin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// change user role
const setUserRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    const targetUser = await User.findOne({ userId: userId });
    if (role !== "admin" || role !== "student" || role !== "teacher") {
      return res.status(401).json({ message: "Invalid role" });
    }
    if (!targetUser) {
      return res.status(401).json({ message: "User not found" });
    }
    targetUser.role = role;
    const savedUser = await targetUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add new institution (school)
const addInstitution = async (req, res) => {
  const {
    institutionName,
    institutionEmail,
    institutionAddress,
    institutionPhone,
    institutionModules,
    institutionAdmins,
    institutionUsers,
  } = req.body;
  const institution = new Institution({
    _id: new mongoose.Types.ObjectId(),
    institutionName,
    institutionEmail,
    institutionAddress,
    institutionPhone,
    institutionModules,
    institutionAdmins,
    institutionUsers,
  });
  try {
    const savedInstitution = await institution.save();
    res.status(201).json(savedInstitution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInstitution = async (req, res) => {
  const { institutionId } = req.params;
  try {
    const institution = await Institution.findOne({
      institutionId: institutionId,
    });
    res.status(200).json(institution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all students
const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export default {
  createAdmin,
  loginAdmin,
  getAdmin,
  deleteAdmin,
  addInstitution,
  getStudents,
  setUserRole,
  getInstitution,
  getAllAdmins,
};
