const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    method: 'GET',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    data: {
      'sort': 'updated',
      'direction': 'desc'
    }
  };

  request(options, (err, res) => {
    // console.log('GitHub GET request response body: ', res.body);
    return res.body;
  });

}

module.exports.getReposByUsername = getReposByUsername;