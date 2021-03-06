const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos?per_page=25`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      callback(error);
    }
    const repos = JSON.parse(body);
    callback(null, repos);
  });

}


// Separate getContributorsByRepo
let getContributorsByRepo = (url, callback) => {

  let options = {
    url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      callback(error)
    }
    const contribs = JSON.parse(body);
    callback(null, contribs);
  });
};

module.exports.getReposByUsername = getReposByUsername;
module.exports.getContributorsByRepo = getContributorsByRepo;
