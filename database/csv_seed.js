const csvWriter = require('csv-write-stream');
const fs = require('fs');

// basicaly since you don't .end the writer the streams to all the files stay open
// so every time you write to one file it writes to all previously opened files also
// I think you can use an end but then you have to create a new writer after every end
let writer = csvWriter();
const faker = require('faker');

const getRandomIntInclusive = (minimum, maximum) => {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const numberOfListings = 10000000;
const numberOfUsers = 1000000;
const numberOfFavorites = 5000000;

let counter = 0;

//seeding Users

async function generateUsersData() {
  writer.pipe(fs.createWriteStream('users_list.csv'));
  for (let i = 1; i <= 1000000; i += 1) {
    const users = {
      id: i,
      username: faker.name.firstName(),
    };

    if (counter % 100000 === 0) {
      console.log('users: ', counter);
    }
    counter += 1;


    const ableToWrite = writer.write(users);
    if (!ableToWrite) {
      await new Promise((resolve) => {
        writer.once('drain', resolve);
      })
        .catch((err) => {
          console.log(err, 'failed to seed users');
        });
    }
  }
  writer.end();
  console.log('successfully seeded users');
}

//Seeding Listings

async function generateListingsData() {
  writer.pipe(fs.createWriteStream('listings.csv'));
  const randomPlusVerified = () => {
    if (getRandomIntInclusive(1, 10) > 3) {
      return true;
    }
    return false;
  };
  const randomCity = ['San Francisco', 'Sacramento', 'Napa', 'Oakland', 'Berkeley', 'San Jose'];
  let randomNearby = [];
  for (let j = 0; j < getRandomIntInclusive(7, 10); j += 1) {
    randomNearby.push(getRandomIntInclusive(1, numberOfListings));
  }
  // randomNearby = randomNearby.join();
  const randomPropertyType = ['Entire Apartment', 'Hotel Room', 'Private Room', 'Entire House', 'Entire Guest Suite', 'Shared Room'];

  for (let i = 1; i <= 10000000; i += 1) {
    const listings = {
      id: i,
      url: `https://mock-property-images.s3-us-west-1.amazonaws.com/houses/house-${getRandomIntInclusive(1, 100)}.jpeg`,
      title: faker.lorem.sentence(),
      city: randomCity[getRandomIntInclusive(0, 5)],
      state: 'CA',
      country: 'US',
      plusVerified: randomPlusVerified(),
      propertyType: randomPropertyType[getRandomIntInclusive(0, 5)],
      price: getRandomIntInclusive(40, 500),
      averageReview: Math.random() + 4,
      totalReviews: Math.floor(Math.random() * 100 + 100),
      nearby: `{${randomNearby}}`,
      about: faker.lorem.paragraphs(),
      theSpace: faker.lorem.paragraphs() + faker.lorem.paragraphs() + faker.lorem.paragraphs() + faker.lorem.paragraphs(),
      neighborhood: faker.lorem.paragraphs(),
    };

    if (counter % 100000 === 0) {
      console.log('listings: ', counter);
    }
    counter += 1;


    const ableToWrite = writer.write(listings);
    if (!ableToWrite) {
      await new Promise((resolve) => {
        writer.once('drain', resolve);
      })
        .catch((err) => {
          console.log(err, 'failed to seed listings');
        });
    }
  }
  writer.end();
  console.log('successfully seeded listings');
}

//Seeding Favorites

async function generateFavoritesData() {
  writer.pipe(fs.createWriteStream('favorites.csv'));
  for (let i = 1; i <= 5000000; i += 1) {
    const favorites = {
      id: i,
      users_list_id: getRandomIntInclusive(1, numberOfUsers),
      favorite_name: faker.lorem.word(),
    };

    if (counter % 100000 === 0) {
      console.log('favorites: ', counter);
    }
    counter += 1;


    const ableToWrite = writer.write(favorites);
    if (!ableToWrite) {
      await new Promise((resolve) => {
        writer.once('drain', resolve);
      })
        .catch((err) => {
          console.log(err, 'failed to seed favorites');
        });
    }
  }
  writer.end();
  console.log('successfully seeded favorites');
}

//Seeding Saved List

async function generateSavedListData() {
  writer.pipe(fs.createWriteStream('saved_list.csv'));
  for (let i = 1; i <= 10000000; i += 1) {
    const savedList = {
      id: i,
      users_list_id: getRandomIntInclusive(1, numberOfUsers),
      listings_id: getRandomIntInclusive(1, numberOfListings),
      favorites_id: getRandomIntInclusive(1, numberOfFavorites),
    };

    if (counter % 100000 === 0) {
      console.log('savedList: ', counter);
    }
    counter += 1;


    const ableToWrite = writer.write(savedList);
    if (!ableToWrite) {
      await new Promise((resolve) => {
        writer.once('drain', resolve);
      })
        .catch((err) => {
          console.log(err, 'failed to seed savedList');
        });
    }
  }
  console.log('successfully seeded savedList');
  writer.end();
}

// generateUsersData();
generateListingsData();
// generateFavoritesData();
// generateSavedListData();

// async function generateData() {
//   await generateUsersData()
//     .then(() => {
//       writer.end()
//       generateListingsData()
//     }))
//     .then()
// }