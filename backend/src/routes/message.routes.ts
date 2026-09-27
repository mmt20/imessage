import express from "express";
import { getUsersForSidebar, getConversationsForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/conversations", getConversationsForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", upload.single("media"), protectRoute, sendMessage);
// todo: show this in the frontend part
export default router;
