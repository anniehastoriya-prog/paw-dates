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

// GET /playdates/dog/:dogId  --- one dog's schedule (sent + received)
router.get("/dog/:dogId", async (req, res) => {
  const playdates = await getPlaydatesByDogId(req.params.dogId);
  res.send(playdates);
});

// GET /playdates/:id  -- a single playdate
router.get("/:id", async (req, res) => {
  const playdate = await getPlaydateById(req.params.id);
  if (!playdate) return res.status(404).send("Playdate not found.");
  res.send(playdate);
});

// PATCH /playdates/:id  -- accept / decline / cancel (status change)
router.patch("/:id", async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).send("status is required.");
  const playdate = await updatePlaydateStatus(req.params.id, status);
  if (!playdate) return res.status(404).send("Playdate not found.");
  res.send(playdate);
});

// DELETE /playdates/:id
router.delete("/:id", async (req, res) => {
  const playdate = await deletePlaydate(req.params.id);
  if (!playdate) return res.status(404).send("Playdate not found.");
  res.sendStatus(204);
});
