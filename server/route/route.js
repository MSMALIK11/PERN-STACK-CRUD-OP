import express from "express";
import {
  delUser,
  profile,
  searchUser,
  singleUser,
  updateUser,
  userSignup,
} from "../Controller/userController.js";
const router = express.Router();
// create a new user  in database
router.route("/signup").post(userSignup);
// fetch all users  database
router.route("/profile").get(profile);
router.route("/profile/search").get(searchUser);
// fetch a single user by id from database
router.route("/profile/:id").get(singleUser).delete(delUser);
router.route("/profile/update/:id").put(updateUser);

export default router;
