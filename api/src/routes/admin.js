// routes for administation
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import adminController from "../controllers/adminController.js";

router.post("/admin", adminController.createAdmin); // create admin
router.post("/admin/login/*", adminController.adminLogin); // login admin
router.get("/admin/me", auth.authAdmin, adminController.getAdmin); // get admin
router.delete("/admin/me", auth.authAdmin, adminController.deleteAdmin); // delete admin

export default router;
