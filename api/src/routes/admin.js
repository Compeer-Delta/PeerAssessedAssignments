// routes for administation
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import adminController from "../controllers/adminController.js";

router.post("/admin", adminController.createAdmin); // create admin
router.post("/admin/login/*", adminController.loginAdmin); // login admin
router.get("/admin/me", auth, adminController.getAdmin); // get admin
router.delete("/admin/me", auth, adminController.deleteAdmin); // delete admin

export default router;
