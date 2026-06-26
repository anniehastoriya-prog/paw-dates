import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createDog } from "#db/queries/dogs";
import { createPlaydate, updatePlaydateStatus } from "#db/queries/playdates";
import { createRating } from "#db/queries/ratings";
import { createMessage } from "#db/queries/messages";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const users = [];
  for (let i = 1; i <= 3; i++) {
    const user = await createUser("user" + i, "password");
    users.push(user);
  }

  const dogs = [];
  const dogData = [
    ["jiji", "poodle", 2, users[0].id],
    ["oreo", "shih tzu", 9, users[1].id],
    ["paisley", "german shepherd", 5, users[2].id],
    ["bella", "pitbull", 1, users[0].id],
  ];
  for (const [name, breed, age, userId] of dogData) {
    const dog = await createDog(name, breed, age, userId);
    dogs.push(dog);
  }

  const playdate1 = await createPlaydate(dogs[0].id, dogs[1].id, "2026-06-26");
  const playdate2 = await createPlaydate(dogs[1].id, dogs[2].id, "2026-07-01");
  await updatePlaydateStatus(playdate2.id, "confirmed");
  const playdate3 = await createPlaydate(dogs[2].id, dogs[3].id, "2026-07-10");

  await createRating(users[0].id, 2, "bella ate jijis snack!");
  await createRating(users[1].id, 5, "playful but well behaved!");

  await createMessage("wanna go for a walk?", users[0].id, users[1].id);
  await createMessage("yes please", users[1].id, users[0].id);
}
