const db = require('../../database/dbMethods.js');

exports.getListings = (req, res) => {
  
  db.findListing(req, res, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

exports.getSavedList = (req, res) => {
  db.findSavedList(req, res, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

exports.postFavorites = (req, res) => {
  db.postFavorite(req, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('post successful');
    }
  });
};
