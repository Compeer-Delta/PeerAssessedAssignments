//create user route
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import userController from "../controllers/userController.js";

//routes for users
router.post("/login/*", userController.loginUser); //login user
router.post("/register", userController.createUser); //register user
//router.post("/logout", auth.authUser, userController.logoutUser); //logout user

//routes for specific user
router.get("/user/me", auth.authUser, userController.getUser); //get user account
router.patch("/user/me", auth.authUser, userController.updateUser); //update user account
router.delete("/user/me", auth.authUser, userController.deleteUser); //delete user account

export default router;