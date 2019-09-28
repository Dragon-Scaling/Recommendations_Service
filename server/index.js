require('newrelic');
// const redis = require('redis');
const express = require('express');
const cors = require('cors');
const controller = require('./controller/controller.js');

// const cache = redis.createClient();

const port = 3004;
const app = express();

// cache.on("error", function (err) {
//   console.log("Error " + err);
// });


//app.use(require('morgan')('dev'));

app.use(cors());
app.use(express.static('public'));
app.use('/listing/:id', express.static('public'));
app.use('/', express.static('loader'));

// app.use('/api/listing/:id/nearby-listings', express.static('public'));

// #### Read (GET)
app.get('/api/listing/:id/nearby-listings', controller.getListings);

app.get('/api/user/:id/:listing_id/savedlist', controller.getSavedList);

// #### Post (CREATE)
app.post('/api/user/:id/favorites', controller.postFavorites);

// #### Update (UPDATE)
app.put('/api/user/:id/favorites/:id');

// #### Delete (DELETE)
app.delete('/api/user/:id/favorites/:id');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to port ${[port]}`);
});


