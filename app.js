import express from "express";
const app = express();
export default app;

import usersRouter from "#api/users";
import dogsRouter from "#api/dogs";
import messagesRouter from "#api/messages";
import playdatesRouter from "#api/playdates";
import ratingsRouter from "#api/ratings";
import getUserFromToken from "#middleware/getUserFromToken";
import cors from "cors";
import morgan from "morgan";

app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.get("/", (req, res) => res.send("Hello, World!"));

app.use("/users", usersRouter);
app.use("/dogs", dogsRouter);
app.use("/messages", messagesRouter);
app.use("/playdates", playdatesRouter);
app.use("/ratings", ratingsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
D;
