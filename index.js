`use strict`

/*
index is the entry point whatever that means

connect to the database
  * connect to DB and create the model or does the model go somewhere else?

require the 'server' and start it
  * is express the server?

Do I need to be making my own stuff or just refactoring what's in the starter? do i have a brain?
*/

// require('dotenv').config();
const server = require('./src/server.js');
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite:memory');

sequelize.sync() //syncs the database to what?
  .then(() => {
    server.start(3000)
  });
