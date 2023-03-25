//create module route
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import moduleController from "../controllers/moduleController.js";

//routes for modules
router.post("/module/create", auth, moduleController.createModule); //create module
router.get("/module", auth, moduleController.getModule); //get module
router.patch("/module", auth, moduleController.updateModule); //update module
router.delete("/module", auth, moduleController.deleteModule); //delete module

router.get("/modules", auth, moduleController.getModules); //get all modules
router.get("/moduleteachers", moduleController.getModuleTeachers); //get all module teachers

// handle multiple students or teachers within a module
router.post("/module/addteacher", auth, moduleController.addTeacherToModule); //add teacher/s to module
router.delete("/module/removeteacher", auth, moduleController.removeTeacherFromModule); //remove teacher/s from module
router.post("/module/addstudent", auth, moduleController.addStudentToModule); //add student/s to module
router.delete("/module/removestudent", auth, moduleController.removeStudentFromModule); //remove student/s from module
//routes for module submissions
/*router.post("/modules/submit", auth, moduleController.getModules); //submit assignment
router.get("/modules/submit", auth, moduleController.getModules); //submit assignment
router.patch("/module", auth, moduleController.update); //update module submission
router.delete("/module", auth, moduleController.delete); //delete module submission*/

//routes for module feedback
router.post("/module/feedback/submit", auth, moduleController.giveFeedback); //submit feedback
router.get("/module/feedback/view", auth, moduleController.viewFeedback); //view feedback
router.delete("/module/feedback/submit", auth, moduleController.deleteFeedback); //submit feedback

//routes for module submissions (admin)
router.get("/module/submissions", auth, moduleController.getModules); //view all submissions
router.get("/module/submissions", auth, moduleController.getModules); //view submission

export default router;