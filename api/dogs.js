import express from "express";
const router = express.Router();
export default router;

import { getDogs, getDogById, updateDog, deleteDog } from "#db/queries/dogs";
import requireBody from "#middleware/requireBody";

router.get("/", async (req, res) => {
  const dogs = await getDogs();
  res.send(dogs);
});

router.post("/", requireBody(["name", "breed", "age"]), async (req, res) => {
  const dogs = await getDogs();
  res.send(dogs);
});

router.param("id", async (req, res, next, id) => {
  const dog = await getDogById(id);
  if (!dog) return res.status(404).send("Dog not found.");
  req.dog = dog;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.dog);
});

router.put("/:id", requireBody(["name", "breed", "age"]), async (req, res) => {
  const { name, breed, age, userId } = req.body;
  const dog = await updateDog(req.dog.id, name, breed, age, userID);
  res.send(dog);
});

router.delete("/:id", async (req, res) => {
  const dog = await deleteDog(req.dog.id);
  res.send(dog);
});
