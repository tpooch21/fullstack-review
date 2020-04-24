const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, response, body) => {
    if (err) {
      callback(err);
    }
    const repos = JSON.parse(body);
    console.log('Logging response status code => ', response.statusCode);
    console.log('Logging repos from GitHub => ', repos);
    callback(null, results);
  });

}

module.exports.getReposByUsername = getReposByUsername;

// "https://api.github.com/repos/${username}"

