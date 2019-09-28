// const { Client } = require('pg');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  database: 'nearbylistingsdb',
  host: 'ec2-54-183-105-134.us-west-1.compute.amazonaws.com',
  password: '$whatever',
  port: 5432	
});
  
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
// });

// const client = new Client({
//   user: '',
//   host: 'localhost',
//   database: 'nearbylistingsdb',
//   password: '',
//   port: 5432,
// });

const generateQuery = function (arr) {
  let query = 'SELECT * FROM listings WHERE ';
  const conditions = [];
  arr.forEach((id) => {
    conditions.push(`id=${id}`);
  });
  query += conditions.join(' OR ') + ';';
  return query;
};

// client.connect();
pool.connect();

exports.findListing = (req, res, callback) => {
  // console.log(req.params.id);
  const input = `SELECT * FROM listings where id='${req.params.id}';`;

  pool.query(input, (error, results) => {
    if (error) {
      callback(error);
    } else {
      // console.log('results:', results.rows[0].nearby);
      const array = results.rows[0].nearby;
      const joinQuery = `${generateQuery(array)}`;
      pool.query(joinQuery, (err, data) => {
        if (err) {
          callback(err);
        } else {
          const processedData = data.rows.map(property => {
            return {
              savedList: [],
              id: property.id,
              url: property.url,
              title: property.title,
              city: property.city,
              state: property.state,
              country: property.country,
              plusVerified: property.plusverified === 't' ? true : false,
              propertyType: property.propertytype,
              price: property.price,
              averageReview: property.averagereview,
              totalReviews: property.totalreviews,
              nearby: property.nearby,
              about: property.about,
              theSpace: property.thespace,
              neighborhood: property.neighborhood,
            };
          });
          // callback(null, data.rows);
          callback(null, processedData);
        }
      });
    }
  });
};

exports.findSavedList = (req, res, callback) => {
  // console.log(req.params.id, req.params.listing_id);
  const input = `SELECT * FROM saved_list 
  INNER JOIN favorites ON favorites.id = saved_list.favorites_id
  INNER JOIN listings ON listings.id = saved_list.listings_id
  WHERE saved_list.users_list_id = ${req.params.id} AND saved_list.listings_id = ${req.params.listing_id}`;
  pool.query(input, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results.rows);
    }
  });
};

// exports.postFavorite = (req, callback) => {
//   console.log(req.params.id, req.params.listing_id);
//   const input = `INSERT INTO favorites ()`;
//   pool.query(input, (error, results) => {
//     if (error) {
//       callback(error);
//     } else {
//       callback(null, results.rows);
//     }
//   });
// };

// const postBudgetCategories = function(req, callback) {
//   // TODO - your code here!
//   // console.log('req.body: ', req.body);
//   let input = `INSERT INTO budgetCategories (category, budget) VALUES (?, ?)`
//   connection.query(input, [req.body.category, req.body.budget], (error, results) => {
//     if (error) {
//       console.log(error);
//       callback(error);
//     } else {
//       console.log(results);
//       callback(null, results);
//     }
//   })
// };


// FROM
//    customer
// INNER JOIN payment ON payment.customer_id = customer.customer_id
// INNER JOIN staff ON payment.staff_id = staff.staff_id;

// SELECT * FROM saved_list INNER JOIN users_list ON users_list.id = saved_list.users_list_id;
// SELECT saved_list.id, saved_list.listings_id, users_list.id, users_list.username, favorites.id, favorites.users_list.id, favorites.favorite_name
// FROM saved_list 
// INNER JOIN users_list ON users_list.id = saved_list.users_list_id
// INNER JOIN favorites ON favorites.id = saved_list.favorites_id;

// SELECT * FROM saved_list 
// INNER JOIN favorites ON favorites.id = saved_list.favorites_id
// INNER JOIN listings ON listings.id = saved_list.listings_id
// WHERE saved_list.users_list_id = ${req.params.id};

// CREATE TABLE listings (
//   id serial PRIMARY KEY,
//   url varchar(288) NOT NULL,
//   title varchar(120) NOT NULL,
//   city city,
//   state varchar(20) NOT NULL,
//   country varchar(20) NOT NULL,
//   plusVerified boolean NOT NULL,
//   propertyType propertyType, 
//   price smallint NOT NULL, 
//   averageReview decimal NOT NULL,
//   totalReviews integer NOT NULL,
//   nearby integer ARRAY,
//   about text NOT NULL,
//   theSpace text NOT NULL,
//   neighborhood text NOT NULL
// );

// SELECT * FROM Users JOIN Reviews ON Reviews.restaurant_id= '${results[0].id}' AND Reviews.user_id=Users.id

// CREATE TABLE saved_list (
//   id serial PRIMARY KEY,
//   users_list_id integer NOT NULL REFERENCES users_list(id),
//   listings_id integer NOT NULL REFERENCES listings(id),
//   favorites_id integer NOT NULL REFERENCES favorites(id)
// );

// CREATE TABLE users_list (
//   id serial PRIMARY KEY,
//   username varchar(20) NOT NULL
// );

// CREATE TABLE favorites (
//   id serial PRIMARY KEY,
//   users_list_id integer NOT NULL REFERENCES users_list(id),
//   favorite_name varchar(20) NOT NULL
// );
