const faker = require('faker');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const usersCsvWriter = createCsvWriter({
  path: 'users_list.csv',
  header: [
    ['username', 'username'],
  ],
});

const listingsCsvWriter = createCsvWriter({
  path: 'listings.csv',
  header: [
    ['url', 'url'],
    ['title', 'title'],
    ['city', 'city'],
    ['state', 'state'],
    ['country', 'country'],
    ['plusVerified', 'plusVerified'],
    ['propertyType', 'propertyType'],
    ['price', 'price'],
    ['averageReview', 'averageReview'],
    ['totalReviews', 'totalReviews'],
    ['nearby', 'nearby'],
    ['about', 'about'],
    ['theSpace', 'theSpace'],
    ['neighborhood', 'neighborhood'],
  ],
});

const favoritesCsvWriter = createCsvWriter({
  path: 'favorites.csv',
  header: [
    ['users_list_id', 'users_list_id'],
    ['favorite_name', 'favorite_name'],
  ],
});

const savedListCsvWriter = createCsvWriter({
  path: 'saved_list.csv',
  header: [
    ['users_list_id', 'users_list_id'],
    ['listings_id', 'listings_id'],
    ['favorites_id', 'favorites_id'],
  ],
});

const usersArray = [];
const listingsArray = [];
const favoritesArray = [];
const savedListArray = [];

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numberOfListings = 1000;
const numberOfUsers = 1000;
const numberOfFavorites = 1000;

const generateUsersData = () => {
  let user = {
    username: faker.name.firstName(),
  };
  return user;
};

const generateListingsData = () => {
  const randomPlusVerified = () => {
    if(getRandomIntInclusive(1, 10) > 3) {
      return true;
    }
    return false;
  };
  const randomCity = ['San Francisco', 'Sacramento', 'Napa', 'Oakland', 'Berkeley', 'San Jose'];
  
  let randomNearby = [];
  for (let i = 0; i < getRandomIntInclusive(7, 10); i += 1) {
    randomNearby.push(getRandomIntInclusive(1, numberOfListings));
  }

  let listing = {
    url: `https://mock-property-images.s3-us-west-1.amazonaws.com/houses/house-${getRandomIntInclusive(1, 100)}.jpeg`,
    title: faker.lorem.sentence(),
    city: randomCity[getRandomIntInclusive(0, 5)],
    state: 'CA',
    country: 'US',
    plusVerified: randomPlusVerified(),
    propertyType: faker.lorem.words(),
    price: getRandomIntInclusive(40, 500),
    averageReview: Math.random() + 4,
    totalReviews: Math.floor(Math.random() * 100 + 100),
    nearby: randomNearby,
    about: faker.lorem.paragraphs(),
    theSpace: faker.lorem.paragraphs()
    + faker.lorem.paragraphs()
    + faker.lorem.paragraphs()
    + faker.lorem.paragraphs(),
    neighborhood: faker.lorem.paragraphs(),
  };


  return listing;
};

const favoritesCsvWriter = createCsvWriter({
  path: 'favorites.csv',
  header: [
    ['users_list_id', 'users_list_id'],
    ['favorite_name', 'favorite_name'],
  ],
});

const savedListCsvWriter = createCsvWriter({
  path: 'saved_list.csv',
  header: [
    ['users_list_id', 'users_list_id'],
    ['listings_id', 'listings_id'],
    ['favorites_id', 'favorites_id'],
  ],
});

const generateFavoritesData = () => {
  let favorite = {
    users_list_id: getRandomIntInclusive(1, numberOfUsers),
    favorite_name: faker.lorem.word(),
  };
  return favorite;
};

const generateSavedListData = () => {
  let savedList = {
    users_list_id: getRandomIntInclusive(1, numberOfUsers),
    listings_id: getRandomIntInclusive(1, numberOfListings),
    favorites_id: getRandomIntInclusive(1, numberOfFavorites),
  };
  return savedList;
};

for (let i = 1; i <= 1000; i += 1) {
  const user = generateUsersData();
  usersArray.push(user);
}

for (let i = 1; i <= 1000; i += 1) {
  const listing = generateListingsData();
  listingsArray.push(listing);
}

for (let i = 1; i <= 1000; i += 1) {
  const favorite = generateFavoritesData();
  favoritesArray.push(favorite);
}

for (let i = 1; i <= 1000; i += 1) {
  const savedlisting = generateSavedListData();
  savedListArray.push(savedlisting);
}

usersCsvWriter
  .writeRecords(usersArray)
  .then(() => console.log('The users CSV file was written successfully'));


listingsCsvWriter
  .writeRecords(listingsArray)
  .then(() => console.log('The listings CSV file was written successfully'));

favoritesCsvWriter
  .writeRecords(favoritesArray)
  .then(() => console.log('The favorites CSV file was written successfully'));

savedListCsvWriter
  .writeRecords(savedListArray)
  .then(() => console.log('The savedList CSV file was written successfully'));

