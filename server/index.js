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
    // Make another API call, this time grabbing the contributors for each repo
    // Will need to provide Repo name, and owner name
    results.forEach(repo => {
      githubRepos.getContributorsByRepo(repo.contributors_url, (err, contribs) => {
        // For each repo, will get contributor info
        // Add the repo to the db first, then when that's successful, iterate over each of the contributors and add them to that collection, passing thru the object id of the repo from the repo collection
        db.save(repo, )
      });
    });

    /*
    { login: 'tomjoht',
    id: 6385062,
    node_id: 'MDQ6VXNlcjYzODUwNjI=',
    avatar_url: 'https://avatars2.githubusercontent.com/u/6385062?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/tomjoht',
    html_url: 'https://github.com/tomjoht',
    followers_url: 'https://api.github.com/users/tomjoht/followers',
    following_url:
     'https://api.github.com/users/tomjoht/following{/other_user}',
    gists_url: 'https://api.github.com/users/tomjoht/gists{/gist_id}',
    starred_url:
     'https://api.github.com/users/tomjoht/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/tomjoht/subscriptions',
    organizations_url: 'https://api.github.com/users/tomjoht/orgs',
    repos_url: 'https://api.github.com/users/tomjoht/repos',
    events_url: 'https://api.github.com/users/tomjoht/events{/privacy}',
    received_events_url: 'https://api.github.com/users/tomjoht/received_events',
    type: 'User',
    site_admin: false,
    contributions: 1 } ]
    */


  //   db.save(results, (err, repoInfo) => {
  //     if (err) {
  //       res.status(501).end('Duplicate entry');
  //     } else {
  //       console.log('Logging imported repos => ', repoInfo);
  //       res.status(201).json(repoInfo); // {"repoInfo": '20'}
  //     }

  //   });

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

