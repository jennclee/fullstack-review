const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log('Woohoo! Connected to the DB!');
});

// mongodb://jlee:<PASSWORD>@gh-fsreview-shard-00-00-7hw3c.mongodb.net:27017,gh-fsreview-shard-00-01-7hw3c.mongodb.net:27017,gh-fsreview-shard-00-02-7hw3c.mongodb.net:27017/test?ssl=true&replicaSet=GH-FSReview-shard-0&authSource=admin

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  repo_id: Number,
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
  	if (err) console.log(err);
  	console.log('newRepo has been saved: ', newRepo);
  });
}

let retrieve = () => {
	Repo.find({})
}

module.exports.save = save;