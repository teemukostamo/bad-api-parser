# Legacy api parser

### A node / Express app to fetch data from a legacy API, and to further serve the parsed data on to a Apollo-Graphql server.

A clothing brand has their warehouse availability information served from two legacy APIs at https://bad-api-assignment.reaktor.com. The three product categories they are interested in for now are `jackets`, `shirts`, and `accessories`.

- `GET /products/:category` returns a listing of products in a given category
- `GET /availability/:manufacturer` returns a a list of availability info

Both APIs have an internal cache of about 5 minutes.

This application fetches data from those three product category endpoints, compares the `/product/` id's to availability id's fetched from the `/availability/` endpoint, and saves the product data with availability information into three `.json` files. A timestamp indicating when the data is fetched from leacy APIs in included in the `.json` files.

The server is set to fetch data from the legacy APIs every time the server is started, and `setInterval` is in place to refetch data every five minutes.

## Install instructions

Clone the repository, and `npm install` the dependencies.

- run `npm run dev` to run the server in development mode with nodemon.
- run `npm start` to run the server in producton mode.

To deploy application to Heroku:

- set a Heroku remote by running `heroku git:clone -a <your-repo-name>`
- run `heroku config:set PORT=5000`
- run `npm run deploy:full` to commit latest changes and push to Heroku
