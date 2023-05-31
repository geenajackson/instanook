# InstaNook

[InstaNook](https://cold-expansion.surge.sh/) is your one stop shop for all of your Animal Crossing: New Horizons needs. InstaNook is powered by a React.js front end, a Node.js and Express.js back end, and PostgreSQL for all of its database needs. InstaNook sources its data from the free, RESTful [ACNH API](http://acnhapi.com/).

Users are able to list villagers and items online and be able to  “purchase” the villager/item from other users' listings, which will add the listing to a shopping cart. When the sale is completed, the shopping cart is cleared, and the purchases are added to the user's history page. Users will be prompted to sign up/login on the home page when first visiting the website. Once logged in, the home page will show the most recent listings, and the user can navigate the site via the navbar. Users are kept logged in via a token stored in local storage.

The backend API is created via queries made to the databse and listing routes to said queries using Express.js. The frontend includes an api.js file that interacts with the backend's API via Axios.

Instanook is hosted via [Render](https://render.com/) and [ElephantSQL](https://www.elephantsql.com/) for the backend and [Surge](https://surge.sh/) for the frontend at [this link](https://cold-expansion.surge.sh/).

## Why InstaNook?
This project is designed to further improve my skills with React and practice working with an external API and tying together a React frontend with a Node/Express backend along with adding a database. This project allows for more experience with functional component design, a working backend API from scratch, and practicing refactoring code and writing tests. Instanook combines two areas I am familiar with: Instacart, the online grocery shopping app, and Animal Crossing, a franchise I know and love.

## Proposal and Schema

Find the proposal for this project [in this document](https://docs.google.com/document/d/1gZZRdOiqwTYAydnm7RufvIC_eJZkoDUUTRxIAUNRcJM/edit?usp=sharing).

Find the schema for the database [in this spreadsheet](https://docs.google.com/spreadsheets/d/1GVp1WQVOvfSp1tS5LzKOJ2X4JcrHMWsAhX-B55A1Y2I/edit?usp=sharing).

## Running Tests
All dependencies can be installed using the command:
```
$ npm i
```

To run tests in the backend:
```
$ instanook/backend/ jest name.test.js
```

To run tests in the frontend:
```
$ instanook/frontend/ npm test
```
