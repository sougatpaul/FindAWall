# Backend

This makes call to the unsplash APIs and parses the results

## How to get Unsplash API key

Refer this [link](https://unsplash.com/documentation)

## How to get it working

- Create a .env file with following contents

  ```
  ACCESS_KEY=[Your Unsplash API Access key]
  SECRET_KEY=[Your Unsplash API Secret key]
  CALLBACK_URL=[http://localhost:3000]
  PORT=[5001]
  ```

- Create a file ./logs/requests.log

- Run

  ```
  npm run install
  ```

  or

  ```
  yarn install
  ```

- Starting the development server
  ```
  npm run watch
  ```
  or
  ```
  yarn watch
  ```
- Build production server
  ```
  npm run build
  ```
  or
  ```
  yarn build
  ```
- Build and production server
  ```
  npm run start
  ```
  or
  ```
  yarn run start
  ```

## APIs available

All routes are relative to the URL

- http://localhost:5000/api/photos?page=[pageNumber]&count=[numberOfImagesPerPage]

  Returns an array of image objects

- http://localhost:5000/api/photos/search?page=[pageNumber]&count=[numberOfImagesPerPage]&keyword=[keyword]

  Returns a json object which contains a key result whose value is an array of image objects

Please run the API examples provided in requests.rest with a rest client to know the result structure
