# Recommedantions Service

> Displays listings nearby

## Related Projects

  - https://github.com/haab-solutions/photo-gallery-module
  - https://github.com/haab-solutions/reviews-module
  - https://github.com/haab-solutions/recommendations-module
  - https://github.com/haab-solutions/reservation-module

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Setup config.js in ./database/

## Requirements

- Node 10.16

## Development

- npm run seed
- npm run build:dev
- npm run start:dev

## CRUD API

#### Create (POST)
app.post('/api/user/:id/favorites') 

#### Read (GET)

app.get('/api/listing/:id'/nearby-listings') 

app.get('/api/user/:id/savedlist')

#### Update (UPDATE)
app.put('/api/user/:id/favorites/:id')

#### Delete (DELETE)
app.delete('/api/user/:id/favorites/:id')




### Installing Dependencies

From within the root directory:

```sh
npm install
```

