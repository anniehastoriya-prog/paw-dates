DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS playdates;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS externalEvents; 

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE playdates (
  id SERIAL PRIMARY KEY,
  request_dog_id INTEGER NOT NULL REFERENCES dog(id) ON DELETE CASCADE,
  recipient_dog_id INTEGER NOT NULL REFERENCES dog(id) ON DELETE CASCADE,
  timeslot DATE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK ( status IN ('pending', 'confirmed', 'declined','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);
