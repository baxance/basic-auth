`use strict`

/*
service wiring?

exports an express app/server and a start method
*/

const express = require('express');
const base64 = require('base-64');
const app = express();
const Users = require('../auth/model.js')

app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send("Error Creating User"); }
});


app.post('/signin', async (req, res) => {

  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User')
    }
  } catch (error) { res.status(403).send("Invalid Login"); }

});

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log('server up on port ' + port));
  }
};
