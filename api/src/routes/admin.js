// routes for administation
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import adminController from "../controllers/adminController.js";
import userController from "../controllers/userController.js";

router.post("/admin", adminController.createAdmin); // create admin
router.post("/admin/login", adminController.loginAdmin); // login admin
router.get("/admin/me", auth, adminController.getAdmin); // get admin
router.delete("/admin/me", auth, adminController.deleteAdmin); // delete admin

router.get("/admin/getall", userController.getAllUsers); // get all users

export default router;
