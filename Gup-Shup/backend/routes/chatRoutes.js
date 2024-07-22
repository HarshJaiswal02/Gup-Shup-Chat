const { Router } = require("express");
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../controllers/chatController.js";
import { verifyJWT } from "../middleware/jwtVerify.js";

const router = Router();

//secured routes
router.route("/").post(verifyJWT, accessChat);
router.route("/").get(verifyJWT, fetchChats);
router.route("/group").post(verifyJWT, createGroupChat);
router.route("/rename").put(verifyJWT, renameGroup);
router.route("/groupremove").put(verifyJWT, removeFromGroup);
router.route("/groupadd").put(verifyJWT, addToGroup);

export default router;
