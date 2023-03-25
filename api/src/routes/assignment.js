// routes for assignment
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import assignmentController from "../controllers/assignmentController.js";

//routes for assignments
router.post("/assignment/upload/", auth, assignmentController.addAssignment); //upload assignment
router.get("/assignment/:moduleId/:assignmentId", auth, assignmentController.getAssignment); //get assignment
router.patch("/assignment/", auth, assignmentController.updateAssignment); //update assignment
router.delete("/assignment/", auth, assignmentController.deleteAssignment); //delete assignment

//routes for submissions
router.post("/assignment/submit/", auth, assignmentController.createSubmission); //Submit assignment work
router.get("/submission/", auth, assignmentController.getSubmission); //Get submission
router.patch("/submission/", auth, assignmentController.updateSubmission); //Update submission
router.delete("/submission/", auth, assignmentController.deleteSubmission);
export default router;