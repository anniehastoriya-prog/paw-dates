import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createMessage } from "#db/queries/messages";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user1 = await createUser("foo", "bar");
  const user2 = await createUser("user2", "password");

  await createMessage("wanna go for a walk?", user1.id, user2.id);
  await createMessage("yes please", user2.id, user1.id);
  await createMessage("no i hate walking >:(", user2.id, user1.id);
}
