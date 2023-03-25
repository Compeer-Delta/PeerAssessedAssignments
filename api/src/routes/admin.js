// routes for administation
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import adminController from "../controllers/adminController.js";
import userController from "../controllers/userController.js";
import moduleController from "../controllers/moduleController.js";
// routes for a single admin
router.post("/admin/register", adminController.createAdmin); // create admin
router.post("/admin/login", adminController.loginAdmin); // login admin
router.get("/admin/me", auth, adminController.getAdmin); // get admin
router.delete("/admin/me", auth, adminController.deleteAdmin); // delete admin
// route for admin to add an institution
router.post("/admin/register/institution", adminController.addInstitution); // add institution
// routes to get all users, admins and modules
router.get("/admin/getallusers", auth, userController.getAllUsers); // get all users
router.get("/admin/getalladmins", auth, adminController.getAllAdmins); // get all admins
router.get("/admin/getallmodules", auth, moduleController.getAllModules); // get all admins

export default router;
