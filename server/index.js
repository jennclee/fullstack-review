const express = require('express');
let app = express();
const bodyparser = require('body-parser');
const Promise = require('bluebird');
const getRepo = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyparser.json());

app.post('/repos', (req, res) => {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.searchTerm;
  Promise.resolve(getRepo.getReposByUsername(username)).then( (response) => {
  		console.log('The user will now be saved to the database...')
	  	let repoList = JSON.parse(response);
	  	repoList.forEach( (repo) => {
	  		let saveRepoInfo = {};
	  		saveRepoInfo['username'] = repo.owner.login;
	  		saveRepoInfo['repo_id'] = repo.id;
	  		saveRepoInfo['repo_name'] = repo.name;
	  		saveRepoInfo['repo_link'] = repo.html_url;
	  		saveRepoInfo['repo_watchers'] = repo.watchers_count;
	  		console.log(saveRepoInfo);
	  		db.save(saveRepoInfo);
	  	});
  		res.status(201).send('POST successful');
  	}).catch ( (e) => {
  		console.log('error: ', e);
  	})
});

app.get('/repos', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
  Promise.resolve(db.retrieve()).then( (results) => {
  	console.log('Retrieved top 25 results: ', results);
    console.log('Posting top 25 results...');
    res.status(200).send(results);
  }).catch( (e) => console.log(e) );


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

