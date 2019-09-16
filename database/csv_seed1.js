const faker = require('faker');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;

const usersCsvWriter = createCsvWriter({
  path: 'users_list.csv',
  header: ['id', 'username'],
});

const listingsCsvWriter = createCsvWriter({
  path: 'listings.csv',
  header: ['id', 'url', 'title', 'city', 'state', 'country', 'plusVerified', 'propertyType', 'price', 'averageReview', 'totalReviews', 'nearby', 'about', 'theSpace', 'neighborhood'],
});

const favoritesCsvWriter = createCsvWriter({
  path: 'favorites.csv',
  header: ['id', 'users_list_id', 'favorite_name'],
});

const savedListCsvWriter = createCsvWriter({
  path: 'saved_list.csv',
  header: ['id', 'users_list_id', 'listings_id', 'favorites_id'],
});

const usersArray = [];
const listingsArray = [];
const favoritesArray = [];
const savedListArray = [];

const getRandomIntInclusive = (minimum, maximum) => {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const numberOfListings = 10000000;
const numberOfUsers = 1000000;
const numberOfFavorites = 5000000;

const generateUsersData = (i) => {
  const user = [
    i,
    faker.name.firstName()
  ];
  return user;
};

const generateListingsData = (i) => {
  const randomPlusVerified = () => {
    if (getRandomIntInclusive(1, 10) > 3) {
      return true;
    }
    return false;
  };
  const randomCity = ['San Francisco', 'Sacramento', 'Napa', 'Oakland', 'Berkeley', 'San Jose'];
  const randomNearby = [];
  for (let j = 0; j < getRandomIntInclusive(7, 10); j += 1) {
    randomNearby.push(getRandomIntInclusive(1, numberOfListings));
  }
  const randomPropertyType = ['Entire Apartment', 'Hotel Room', 'Private Room', 'Entire House', 'Entire Guest Suite', 'Shared Room']

  const listing = [
    i,
    `https://mock-property-images.s3-us-west-1.amazonaws.com/houses/house-${getRandomIntInclusive(1, 100)}.jpeg`,
    faker.lorem.sentence(),
    randomCity[getRandomIntInclusive(0, 5)],
    'CA',
    'US',
    randomPlusVerified(),
    randomPropertyType[getRandomIntInclusive(0, 5)],
    getRandomIntInclusive(40, 500),
    Math.random() + 4,
    Math.floor(Math.random() * 100 + 100),
    randomNearby,
    faker.lorem.paragraphs(),
    faker.lorem.paragraphs() + faker.lorem.paragraphs() + faker.lorem.paragraphs() + faker.lorem.paragraphs(),
    faker.lorem.paragraphs()
  ];
  return listing;
};


const generateFavoritesData = (i) => {
  const favorite = [
    i,
    getRandomIntInclusive(1, numberOfUsers),
    faker.lorem.word()
  ];
  return favorite;
};

const generateSavedListData = (i) => {
  const savedList = [
    i,
    getRandomIntInclusive(1, numberOfUsers),
    getRandomIntInclusive(1, numberOfListings),
    getRandomIntInclusive(1, numberOfFavorites)
  ];
  return savedList;
};

for (let i = 1; i <= 1000000; i += 1) {
  const user = generateUsersData(i);
  usersArray.push(user);
}

for (let i = 1; i <= 10000000; i += 1) {
  const listing = generateListingsData(i);
  listingsArray.push(listing);
}

for (let i = 1; i <= 5000000; i += 1) {
  const favorite = generateFavoritesData(i);
  favoritesArray.push(favorite);
}

for (let i = 1; i <= 10000000; i += 1) {
  const savedlisting = generateSavedListData(i);
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