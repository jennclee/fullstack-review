const express = require('express');
let app = express();
const bodyparser = require('body-parser');
const Promise = require('bluebird');
const getRepo = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyparser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.searchTerm;
  Promise.resolve(getRepo.getReposByUsername(username)).then( (response) => {
  	// parse response
  	// only want repo_name (name), repo_link (html_url), repo_watchers (watchers_count), repo_id (id), username (owner.login), user_link (owner.html_url)
  	console.log('response from GH: ', response);
  })
  res.send('POST successful');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

