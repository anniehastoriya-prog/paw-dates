import db from "#db/client";

export async function createMessage(content, senderId, receiverId) {
  const sql = `
  INSERT INTO messages
    (content, sender_id, receiver_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [message],
  } = await db.query(sql, [content, senderId, receiverId]);
  return message;
}

export async function getMessagesBetweenUsers(userId, otherUserId) {
  const sql = `
  SELECT *
  FROM messages
  WHERE (sender_id = $1 AND receiver_id = $2)
    OR (sender_id = $2 AND receiver_id = $1)
  ORDER BY created_at ASC
  `;
  const { rows: messages } = await db.query(sql, [userId, otherUserId]);
  return messages;
}

export async function getMessageById(id) {
  const sql = `
  SELECT *
  FROM messages
  WHERE id = $1
  `;
  const {
    rows: [message],
  } = await db.query(sql, [id]);
  return message;
}

export async function deleteMessageById(id) {
  const sql = `
  DELETE FROM messages
  WHERE id = $1
  `;
  await db.query(sql, [id]);
}
