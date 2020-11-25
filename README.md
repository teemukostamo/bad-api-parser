# Legacy api parser

### A node / Express app to fetch data from a legacy API, and to further serve the parsed data on to a Apollo-Graphql server.

The application using data from this parser is deployed [here](https://warehouse-legacy-api.herokuapp.com/), and the repository is [here](https://github.com/teemukostamo/warehouse-legacy-api)

A clothing brand has their warehouse availability information served from two legacy APIs at https://bad-api-assignment.reaktor.com. Both APIs have an internal cache of about 5 minutes.

- `GET /products/:category` returns a listing of products in a given category
- `GET /availability/:manufacturer` returns a a list of availability info

The three product categories they are interested in for now are `jackets`, `shirts`, and `accessories`.

This application fetches data from those three product category endpoints, compares the `/product/` id's to availability id's fetched from the `/availability/` endpoints, and saves the product data with availability information into three respective `.json` files. A timestamp indicating when the data is fetched from leacy APIs in included in the `.json` files.

The server is set to fetch data from the legacy APIs every time the server is started, and `setInterval` is in place to refetch data every five minutes.

## Install instructions

- clone the repository, and `npm install` the dependencies.
- run `npm run dev` to run the server in development mode with nodemon.
- run `npm start` to run the server in producton mode.

# Docker

- To build a Docker image of the repository, run `docker build -t bad-api-parser .` in the root directory.
- To run the container, run `docker run -p 5000:5000 bad-api-parser`

# Deploying to Heroku

- If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key by running `heroku login`
- Run `heroku git:remote -a <your-heroku-app-name>`
- Set the `PORT` environment variable to match the value in your `.env` file: `heroku config:set PORT=<YOUR PORT>`
- Run `npm run deploy:full` to commit changes and push the code to GitHub and Heroku.

# Licensing

This project is licensed under Unlicense license.
