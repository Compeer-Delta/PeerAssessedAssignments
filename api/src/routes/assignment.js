// routes for assignment
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import assignmentController from "../controllers/assignmentController.js";

//routes for assignments
router.post("/assignment/add/", auth, assignmentController.addAssignment); //add new assignment
router.get("/assignment/:moduleId/:assignmentId", auth, assignmentController.getAssignment); //get assignment
router.put("/assignment/:assignmentId/", auth, assignmentController.updateAssignment); //update assignment
router.delete("/assignment/", auth, assignmentController.deleteAssignment); //delete assignment

export default router;