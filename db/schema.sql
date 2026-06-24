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

CREATE TABLE ratings (
  id serial PRIMARY KEY,
  sender_id integer NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  paws integer NOT NULL,
  comments text NOT NULL
);