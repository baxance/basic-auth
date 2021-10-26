/*
Create a module to house all of routes for the authentication system.
  * Create a POST route for /signup
    * Accepts either a JSON object or FORM Data with the keys “username” and “password”.
    * Creates a new user record in a Postgres database.
    * Returns a 201 with the created user record.
Create a POST route for /signin.
  * Use your basic authentication middleware to perform the actual login task.
  * router.post('/signin', basicAuth, (req,res) => {});
  * When validated, send a JSON object as the response with the following properties:
    * user: The users’ database record
*/

app.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
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