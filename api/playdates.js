import express from "express";
const router = express.Router();
export default router;

import {
  getAllPlaydates,
  getPlaydateById,
  getPlaydatesByDogId,
  createPlaydate,
  updatePlaydateStatus,
  deletePlaydate,
} from "#db/queries/playdates";

router.param("id", async (req, res, next, id) => {
  const playdate = await getPlaydateById(id);
  if (!playdate) return res.status(404).send("Playdate not found.");
  req.playdate = playdate;
  next();
});

// GET /playdates  -- every playdate, newest first
router.get("/", async (req, res) => {
  const playdates = await getAllPlaydates();
  res.send(playdates);
});

// POST /playdates  -- create a new (pending) playdate request
router.post("/", async (req, res) => {
  const { requestDogId, recipientDogId, timeslot } = req.body;
  if (!requestDogId || !recipientDogId || !timeslot) {
    return res
      .status(400)
      .send("requestDogId, recipientDogId, and timeslot are required.");
  }
  const playdate = await createPlaydate(requestDogId, recipientDogId, timeslot);
  res.status(201).send(playdate);
});

// GET /playdates/dog/:dogId  -- one dog's schedule (sent + received)
// Uses :dogId, NOT :id, so the param middleware above doesn't run here --
// which is correct, since this is a dog id, not a playdate id.
router.get("/dog/:dogId", async (req, res) => {
  const playdates = await getPlaydatesByDogId(req.params.dogId);
  res.send(playdates);
});

// GET /playdates/:id  -- a single playdate
// req.playdate was already fetched and existence-checked by router.param.
router.get("/:id", (req, res) => {
  res.send(req.playdate);
});

// PATCH /playdates/:id  -- accept / decline / cancel (status change)
router.patch("/:id", async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).send("status is required.");
  const playdate = await updatePlaydateStatus(req.params.id, status);
  res.send(playdate);
});

// DELETE /playdates/:id
router.delete("/:id", async (req, res) => {
  await deletePlaydate(req.params.id);
  res.sendStatus(204);
});
