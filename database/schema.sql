DROP DATABASE IF EXISTS nearbyListingsDB;
CREATE DATABASE IF NOT EXISTS nearbyListingsDB;

\c nearbyListingsDB;

CREATE TABLE users_list (
  id serial PRIMARY KEY,
  username varchar(20) NOT NULL;
);

CREATE TYPE propertyType AS ENUM ('Entire Apartment', 'Hotel Room', 'Private Room', 'Entire House', 'Entire Guest Suite', 'Shared Room');
CREATE TYPE city AS ENUM ('San Francisco', 'Sacramento', 'Napa', 'Oakland', 'Berkeley', 'San Jose');

CREATE TABLE listings (
  id serial PRIMARY KEY,
  url varchar(288) NOT NULL,
  title varchar(20) NOT NULL,
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



   
