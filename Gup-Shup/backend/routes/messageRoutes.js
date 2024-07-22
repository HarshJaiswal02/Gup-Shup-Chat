import { Router } from "express";
import { verifyJWT } from "../middleware/jwtVerify";

const router = Router();

//Secured routes
router.route("/:chatId").get(verifyJWT, allMessages);
router.route("/").post(verifyJWT, sendMessage);

export default router;
