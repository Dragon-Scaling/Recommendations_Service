-- DROP DATABASE IF EXISTS nearbyListingsDB;
-- CREATE DATABASE IF NOT EXISTS nearbyListingsDB;
DROP DATABASE nearbyListingsDB;
CREATE DATABASE nearbyListingsDB;
GRANT ALL PRIVILEGES ON DATABASE nearbyListingsDB TO pammyla;

\c nearbyListingsDB;

-- DROP TABLE users_list CASCADE;
-- DROP TABLE listings CASCADE;
-- DROP TABLE favorites CASCADE;
-- DROP TABLE saved_list CASCADE;

CREATE TABLE users_list (
  id serial PRIMARY KEY,
  username varchar(20) NOT NULL
);

CREATE TYPE propertyType AS ENUM ('Entire Apartment', 'Hotel Room', 'Private Room', 'Entire House', 'Entire Guest Suite', 'Shared Room');
CREATE TYPE city AS ENUM ('San Francisco', 'Sacramento', 'Napa', 'Oakland', 'Berkeley', 'San Jose');

CREATE TABLE listings (
  id serial PRIMARY KEY,
  url varchar(288) NOT NULL,
  title varchar(120) NOT NULL,
  city city,
  state varchar(20) NOT NULL,
  country varchar(20) NOT NULL,
  plusVerified boolean NOT NULL,
  propertyType propertyType, 
  price smallint NOT NULL, 
  averageReview decimal NOT NULL,
  totalReviews integer NOT NULL,
  nearby integer ARRAY,
  about text NOT NULL,
  theSpace text NOT NULL,
  neighborhood text NOT NULL
);

CREATE TABLE favorites (
  id serial PRIMARY KEY,
  users_list_id integer NOT NULL REFERENCES users_list(id),
  favorite_name varchar(20) NOT NULL
);

CREATE TABLE saved_list (
  id serial PRIMARY KEY,
  users_list_id integer NOT NULL REFERENCES users_list(id),
  listings_id integer NOT NULL REFERENCES listings(id),
  favorites_id integer NOT NULL REFERENCES favorites(id)
);

-- COPY users_list(id, username)
COPY users_list
FROM '/Users/pammyla/Documents/SDC/Recommendations_Service/users_list.csv' DELIMITER ',' CSV HEADER;


-- COPY listings(id, url, title, city, state, country, plusVerified, propertyType, price, averageReview, totalReviews, nearby, about, theSpace, neighborhood)
COPY listings
FROM '/Users/pammyla/Documents/SDC/Recommendations_Service/listings.csv' DELIMITER ',' CSV HEADER;

-- COPY favorites(id, users_list_id, favorite_name)
COPY favorites
FROM '/Users/pammyla/Documents/SDC/Recommendations_Service/favorites.csv' DELIMITER ',' CSV HEADER;

-- COPY saved_list(id, users_list_id, listings_id, favorites_id)
COPY saved_list
FROM '/Users/pammyla/Documents/SDC/Recommendations_Service/saved_list.csv' DELIMITER ',' CSV HEADER;
 
-- CREATE INDEX idx_name ON user_list ()

-- CREATE INDEX ON listings (id)

