// routes for assignment
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import assignmentController from "../controllers/assignmentController.js";

//routes for assignments
router.post("/assignment/:id/upload/", auth.authUser, assignmentController.create); //upload assignment
router.get("/assignment/:id", auth.authUser, assignmentController.get); //get assignment
router.patch("/assignment/:id", auth.authUser, assignmentController.update); //update assignment

export default router;