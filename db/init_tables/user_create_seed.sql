-- The table needs to be dropped each time you restart nodemon. This is necessary for the Postman tests.
-- === DROP TABLE ====================

DROP TABLE IF EXISTS users CASCADE;

-- === CREATE TABLE ==================

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(200)
);

-- === INSERT STATEMENT ===============

INSERT INTO users (name, email) VALUES
('John Smith', 'john@smith.com'),
('Dave Davis', 'dave@davis.com'),
('Jane Janis', 'jane@janis.com');
