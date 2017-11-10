const request = require('request');
const config = require('../config.js');
const Promise = require('bluebird');
const db = require('../database/index.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific user from the github API
  // The options object has been provided to help you out, but you'll have to fill in the URL

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
  }

  return new Promise( (resolve, reject) => {
    request(options, (err, res) => {
      console.log('Github GET response: ', res.body);
      resolve(res.body);
    });
  });
}

module.exports.getReposByUsername = getReposByUsername;