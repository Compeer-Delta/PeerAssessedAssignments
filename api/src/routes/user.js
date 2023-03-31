//create user route
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import userController from "../controllers/userController.js";

//routes for users
router.post("/login", userController.loginUser); //login user
router.post("/register", userController.createUser); //register user
//router.post("/logout", auth.authUser, userController.logoutUser); //logout user

//routes for specific user
router.get("/user/me", auth, userController.getUser); //get user account
router.patch("/user/update", auth, userController.updateUser); //update user account
router.delete("/user/delete", auth, userController.deleteUser); //delete user account
router.get("/user/all", auth, userController.getAllUsers); //get all users by institution

export default router;