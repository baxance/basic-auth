'use strict';

/*
Extract the Sequelize Model into a separate module. <- does that mean a new .js file?
  * Model the user data.
  * Add a before-create hook in the model … Before we save a record:
    * Hash the plain text password given before you save a user to the database.
  * Create a method in the schema to authenticate a user using the hashed password.
                            ^ what?
*/
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite:memory');

const Users = sequelize.define('User', { // do i need to bring in sequelize here as well? like the `const { Sequelize, DataTypes } = require('sequelize')` thing?
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Users.beforeCreate(async (user) => {
  let encryptedPassword = await bcrypt.hash(user.password, 10)
  user.password = encryptedPassword;
  console.log(user);
});

module.exports = Users;
