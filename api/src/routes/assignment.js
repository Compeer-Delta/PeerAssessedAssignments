// routes for assignment
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import assignmentController from "../controllers/assignmentController.js";

//routes for assignments
router.post("/assignment/upload/", assignmentController.addAssignment); //upload assignment
router.get("/assignment/", auth, assignmentController.getAssignment); //get assignment
router.patch("/assignment/", auth, assignmentController.updateAssignment); //update assignment
router.delete("/assignment/", auth, assignmentController.deleteAssignment); //delete assignment

export default router;