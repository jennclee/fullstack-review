const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const Promise = require('bluebird');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log('Woohoo! Connected to the DB!');
});


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  repo_id: {
  	type: Number,
  	unique: true
  },
  repo_name: String,
  repo_link: String,
  repo_watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (response) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let newRepo = new Repo({
  	username: response.username,
	repo_id: response.repo_id,
	repo_name: response.repo_name,
	repo_link: response.repo_link,
	repo_watchers: response.repo_watchers
  });
  newRepo.save( (err, newRepo) => {
  	if (err) {
  		console.log('err: ', err);
  	} else {
  		console.log('newRepo has been saved: ', newRepo);
  	}
  });
}

let retrieve = () => {
	console.log('Querying database...');
	return new Promise ( (resolve, reject) => {
		resolve(Repo.find().
		limit(25).
		sort({ repo_watchers: -1 }).
		select({username: 1, repo_name: 1, repo_link: 1, repo_watchers: 1}).
		exec( (err, person) => {
		  if (err) console.log(err);
		}))
	});
}


module.exports.save = save;
module.exports.retrieve = retrieve;