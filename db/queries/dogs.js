import db from "#db/client";

export async function createDog(name, breed, age, userId) {
  const sql = `
  INSERT INTO dogs
    (name, breed, age, userId)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `;
  const {
    rows: [dog],
  } = await db.query(sql, [name, breed, age, userId]);
  return dog;
}

export async function getDogs() {
  const sql = `
  SELECT *
  FROM dogs
  `;
  const { rows: dogs } = await db.query(sql);
  return dogs;
}

export async function getDogsByUserId(id) {
  const sql = `
  SELECT dogs.*
  FROM
    dogs
    JOIN users_dogs ON users_dogs.dog_id = dogs.id
    JOIN users ON users.id = users_dogs.user_id
  WHERE users.id = $1
  `;
  const { rows: dogs } = await db.query(sql, [id]);
  return dogs;
}

export async function getDogById(id) {
  const sql = `
  SELECT *
  FROM dogs
  WHERE id = $1
  `;
  const {
    rows: [dog],
  } = await db.query(sql, [id]);
  return dog;
}
