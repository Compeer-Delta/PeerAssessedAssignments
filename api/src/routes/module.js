//create module route
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import moduleController from "../controllers/moduleController.js";

//routes for modules
router.post("/module/create", auth, moduleController.createModule); //create module
router.get("/module/:id", auth, moduleController.getModule); //get module
router.patch("/module/:id", auth, moduleController.updateModule); //update module
router.delete("/module/:id", auth, moduleController.deleteModule); //delete module

router.get("/modules", auth, moduleController.getModule); //get all modules

//routes for module submissions
/*router.post("/modules/:id/submit", auth, moduleController.getModules); //submit assignment
router.get("/modules/:id/submit", auth, moduleController.getModules); //submit assignment
router.patch("/module/:id", auth, moduleController.update); //update module submission
router.delete("/module/:id", auth, moduleController.delete); //delete module submission*/

//routes for module feedback
router.post("/module/:id/feedback/submit", auth, moduleController.giveFeedback); //submit feedback
router.get("/module/:id/feedback/view", auth, moduleController.viewFeedback); //view feedback
router.delete("/module/:id/feedback/submit", auth, moduleController.deleteFeedback); //submit feedback

//routes for module submissions (admin)
router.get("/module/:id/submissions", auth, moduleController.getModules); //view all submissions
router.get("/module/:id/submissions", auth, moduleController.getModules); //view submission

export default router;