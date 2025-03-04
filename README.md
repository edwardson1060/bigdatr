## Setting up the backend

Fork or download this project `https://github.com/bigdatr/front-end-code-challenge`, then:

```sh
# install dependencies
yarn install

# Run the api
yarn watch:api
```

The api will start running at `http://localhost:4001`.

It consists of 2 GET endpoints

1. `/instruct-drone` - accepts a list of instructions for the drone, and returns all bilboards found with their details. Example usage: `http://localhost:4001/instruct-drone?instructions=x^xv`

2. `/get-billboard` - accepts an ID of a billboard and returns details of a single billboard. Example usage: `localhost:4001/get-billboard?id=5aba7bffddc4ecbbb81e7fad`

## Setting up the frontend
In the project directory, you run the frontend local server:
### `yarn add axios`
### `yarn install`
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
In the Send Instructions field, paste this: x^xv
In the Get Billboard Details field, paste this: 5aba7bffddc4ecbbb81e7fad

## Improvements and Next Steps

1. Error Handling: Improve user feedback for API request errors.
2. Loading State: Add a loading spinner or indication while fetching data.
3. Styling: Use a CSS framework or library like Bootstrap or Material-UI for better UI design.
4. Responsiveness: Ensure the app works well with different screens and devices.