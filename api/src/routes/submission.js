// routes for submission
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import submissionController from "../controllers/submissionController.js";
import multer from "multer";

//multer config
const storage = multer.memoryStorage(); // store files in memory
const upload = multer({ storage: storage }); // upload files to memory storage (not disk)

//routes for submissions
router.post("/assignment/submit/", auth, upload.single('file'), submissionController.createSubmission); //Submit assignment work
router.get("/submission/", auth, submissionController.getSubmission); //Get submission
router.patch("/submission/", auth, submissionController.updateSubmission); //Update submission
router.delete("/submission/", auth, submissionController.deleteSubmission); //Delete submission

//routes for module feedback
router.post("/submission/feedback/submit", auth, submissionController.giveFeedback); //submit feedback
router.post("/submission/feedback/status", auth, submissionController.checkFeedback); //teacher accepts or rejects feedback
router.get("/submission/feedback/view", auth, submissionController.viewFeedback); //view feedback
router.get("/submission/feedback/accepted", auth, submissionController.getAcceptedFeedback); //get all accepted feedback given to submitted assignments of a student
router.delete("/submission/feedback/submit", auth, submissionController.deleteFeedback); //delete feedback

export default router;
