import db from "#db/client";

export async function getAllRatings() {
  const sql = `
    SELECT *
    FROM ratings
    ORDER BY id
    `;
  const { rows: ratings } = await db.query(sql);
  return ratings;
}

export async function getRatingById(id) {
  const sql = `
    SELECT *
    FROM ratings
    WHERE id = $1
    `;
  const {
    rows: [rating],
  } = await db.query(sql, [id]);
  return rating;
}

export async function getRatingsByReceiver(receiver_id) {
  const sql = `
    SELECT *
    FROM ratings
    WHERE receiver_id = $1
    ORDER BY id
    `;
  const { rows: ratings } = await db.query(sql, [receiver_id]);
  return ratings;
}

export async function createRating(receiver_id, paws, comments) {
  const sql = `
    INSERT INTO ratings (receiver_id, paws, comments)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [rating],
  } = await db.query(sql, [receiver_id, paws, comments]);
  return rating;
}

export async function updateRating(id, paws, comments) {
  const sql = `
    UPDATE ratings
    SET paws = $1, comments = $2
    WHERE id = $3
    RETURNING *
    `;
  const {
    rows: [rating],
  } = await db.query(sql, [paws, comments, id]);
  return rating;
}

export async function deleteRating(id) {
  const sql = `
    DELETE FROM ratings
    WHERE id = $1
    RETRUNING *
    `;
  const {
    rows: [rating],
  } = await db.query(sql, [id]);
  return rating;
}
