import express from "express";
const router = express.Router();
export default router;

import {
  createMessage,
  getMessagesBetweenUsers,
  getMessageById,
  deleteMessageById,
} from "#db/queries/messages";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

router.post("/", requireBody(["content", "receiverId"]), async (req, res) => {
  const { content, receiverId } = req.body;
  const message = await createMessage(content, req.user.id, receiverId);
  res.status(201).send(message);
});

router.get("/:receiverId", async (req, res) => {
  const { receiverId } = req.params;
  const messages = await getMessagesBetweenUsers(req.user.id, receiverId);
  res.send(messages);
});

router.param("id", async (req, res, next, id) => {
  const message = await getMessageById(id);
  if (!message) return res.status(404).send("Message not found.");
  if (message.sender_id !== req.user.id)
    return res
      .status(403)
      .send("You do not have permission to delete this message.");
  req.message = message;
  next();
});

router.delete("/:id", async (req, res) => {
  await deleteMessageById(req.message.id);
  res.sendStatus(204);
});
