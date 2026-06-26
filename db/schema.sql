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
  receiver_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  paws integer NOT NULL,
  comments text NOT NULL
  );

CREATE TABLE messages (
  id serial PRIMARY KEY,
  content text NOT NULL,
  sender_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
  );
  
CREATE TABLE dogs (
  id serial PRIMARY KEY,
  name text NOT NULL,
  breed text NOT NULL,
  age integer NOT NULL, 
  ratings integer NOT NULL,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE playdates (
  id SERIAL PRIMARY KEY,
  request_dog_id INTEGER NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  recipient_dog_id INTEGER NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  timeslot DATE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK ( status IN ('pending', 'confirmed', 'declined','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);