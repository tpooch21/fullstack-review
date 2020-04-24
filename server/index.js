const express = require('express');
let app = express();
const parser = require('body-parser');
const morgan = require('morgan');
const githubRepos = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.use(morgan('tiny'));
app.use(parser.json());
app.use(parser.urlencoded());


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('Logging request from client => ', req.body);

  // Step 1 - send get request to GitHub API for user repos
  githubRepos.getReposByUsername(req.body.username, (err, results) => {
    if (err) {
      res.sendStatus(404);
    }
    // Query the database to insert results
    // IMPORT save function from db/index.js
    db.save(results, (err) => {
      if (err) {
        res.sendStatus(501);
      }
      res.sendStatus(201);
    });

  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // IMPORT find function from db/index.js

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port http://localhost:${port}`);
});

