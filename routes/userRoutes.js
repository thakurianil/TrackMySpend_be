import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { editProfile, getProfile } from "../controllers/profileController.js";

import auth from "../middleware/auth.js";

const router = Router();

// Route to register a new user
router.post("/register", registerUser);
router.post("/login", loginUser);

//profile
// Get the current user's profile
router.get('/view-profile', auth, getProfile);
router.put('/update-profile', auth, editProfile);

export default router;
