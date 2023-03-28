// routes for assignment
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

export default router;
