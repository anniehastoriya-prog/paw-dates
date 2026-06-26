import db from "#db/client";
// Gets every pladate in the database, first it grabs the newest one and returns them as an array.
// The array is carrying dog name ans their ID numbers.
//The function hands back a promise that resolves to the playdates once they are ready.
// rd is request dog and cd recipient dog.
export async function getAllPlaydates() {
  const sql = `
  SELECT
    playdates.id,
    playdates.timeslot,
    playdates.status,
    playdates.created_at,
    rd.id AS request_dog_id,
    rd.name AS request_dog_name,
    cd.id AS recipient_dog_id,
    cd.name AS recipient_dog_name
  FROM
    playdates
    JOIN dogs rd ON rd.id = playdates.request_dog_id
    JOIN dogs cd ON cd.id = playdates.recipient_dog_id
  ORDER BY playdates.created_at DESC
  `;
  const { rows: playdates } = await db.query(sql);
  return playdates;
}
// Just getting one playdate.
export async function getPlaydateById(id) {
  const sql = `
  SELECT
    playdates.id,
    playdates.timeslot,
    playdates.status,
    playdates.created_at,
    rd.id AS request_dog_id,
    rd.name AS request_dog_name,
    cd.id AS recipient_dog_id,
    cd.name AS recipient_dog_name
  FROM
    playdates
    JOIN dogs rd ON rd.id = playdates.request_dog_id
    JOIN dogs cd ON cd.id = playdates.recipient_dog_id
  WHERE playdates.id = $1
  `;
  const {
    rows: [playdate],
  } = await db.query(sql, [id]);
  return playdate;
}
// Finds every playdate a certain dog is involved in.
// This shows in two roles the one who has received the playdate and the one who has sent it.
// A dog can have many playdayes. Shows on line code 62.
export async function getPlaydatesByDogId(id) {
  const sql = `
  SELECT *
  FROM playdates
  WHERE request_dog_id = $1 OR recipient_dog_id = $1
  ORDER BY timeslot
  `;
  const { rows: playdates } = await db.query(sql, [id]);
  return playdates;
}
// Creates the playdate.
export async function createPlaydate(requestDogId, recipientDogId, timeslot) {
  const sql = `
  INSERT INTO playdates
    (request_dog_id, recipient_dog_id, timeslot)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [playdate],
  } = await db.query(sql, [requestDogId, recipientDogId, timeslot]);
  return playdate;
}
// Updates the playdates status for pending, cancelled, confirmed, and declined.
export async function updatePlaydateStatus(id, status) {
  const sql = `
  UPDATE playdates
  SET status = $1
  WHERE id = $2
  RETURNING *
  `;
  const {
    rows: [playdate],
  } = await db.query(sql, [status, id]);
  return playdate;
}
// Deletes the playdate
export async function deletePlaydate(id) {
  const sql = `
  DELETE FROM playdates
  WHERE id = $1
  RETURNING *
  `;
  const {
    rows: [playdate],
  } = await db.query(sql, [id]);
  return playdate;
}
