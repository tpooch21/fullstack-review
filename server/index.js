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

  console.log('Logging request from client => ', req.body);

  // Step 1 - send get request to GitHub API for user repos
  githubRepos.getReposByUsername(req.body.username, (err, results) => {
    if (err) {
      res.status(404).end();
    }

    db.save(results, (err, repoInfo) => {
      if (err) {
        res.status(501).end('Duplicate entry');
      } else {
        console.log('Logging imported repos => ', repoInfo);
        res.status(201).json(repoInfo); // {"repoInfo": '20'}
      }

    });

  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find((err, results) => {
    console.log('Logging results from get request to Db => ', results);
    if (err) {
      res.status(404).end();
    }
    res.status(200).json(results);
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port http://localhost:${port}`);
});

