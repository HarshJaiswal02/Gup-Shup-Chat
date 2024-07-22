import { Router } from "express";
import {
  loginUser,
  registerUser,
  allUsers,
} from "../controllers/userControllers.js";
import { upload } from "../middleware/multerMiddleware.js";
import { verifyJWT } from "../middleware/jwtVerify.js";

const router = Router();

router.route("/").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/").post(registerUser);
router.post("/login", loginUser);
//secured routes
router.route("/").get(verifyJWT, allUsers);


export default router;
