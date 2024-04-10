import express from "express";
import {
  SingleUser,
  getPhotoController,
  sendVerificationEmail,
  userLoginController,
  userRegisterController,
  userUpdateController,
  verifyEmailController,
} from "../controllers/userController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post("/register", formidable(), userRegisterController);
router.get("/verify", verifyEmailController);
router.post("/login", userLoginController);

router.put("/update-profile/:id", formidable(), userUpdateController);
router.get("/get-single-user/:id", SingleUser);
router.get("/get-photo/:id", getPhotoController);
router.post("/send-email", sendVerificationEmail);

export default router;
