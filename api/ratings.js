import express from "express";
const router = express.Router();
export default router;

import {
  getAllRatings,
  getRatingById,
  getRatingsByReceiver,
  createRating,
  updateRating,
  deleteRating,
} from "#db/queries/ratings";
import requireUser from "middleware/requireUser";
import requireBody from "middleware/requireBody";

router.get("/", async (req, res) => {
  const ratings = getAllRatings();
  res.send(ratings);
});

router.get("/receiver/:receiver_id", async (req, res) => {
  const ratings = await getRatingsByReceiver(req.params.receiver_id);
  res.send(ratings);
});

router.param("id", async (req, res, next, id) => {
  const rating = await getRatingById(id);
  if (!rating) return res.status(404).send("Rating not found");
  req.rating = rating;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.rating);
});

router.post(
  "/",
  requireUser,
  requireBody("receiver_id", "paws", "comments"),
  async (req, res) => {
    const { receiver_id, paws, comments } = req.body;
    const newRating = await createRating(receiver_id, paws, comments);
    res.status(201).send(newRating);
  },
);

router.put(
  "/:id",
  requireUser,
  requireBody("paws", "comments"),
  async (req, res) => {
    const { paws, comments } = req.body;
    const updated = await updateRating(req.rating.id, paws, comments);
    res.send(updated);
  },
);

router.delete("/:id", requireUser, async (req, res) => {
  const deleted = await deleteRating(req.rating.id);
  res.send(deleted);
});
