const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// const db = mongoose.connection;

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // id: Number
  // owner: string
  // ownerURL: string
  // repo_name: string
  // repo_url: string

});

let Repo = mongoose.model('Repo', repoSchema);

// Should take in an instance of Repo
// Will call that object's save method

// Going to be working with a list of objects from GitHub API

let save = (/* TODO */) => {
  // TODO: Your code here
  // Will take list of objects from GitHub API as input, and error callback
  // Iterate through them, initialize them into instances of Repo
  // Call each object's save method, with error callback
  // If error, callback(error)
  // Probably don't need to return results, but will anyway

}

// Let's also define a find function here that calls .find to access previously saved repos
let find = () => {
  // Repo.find({id: }) --> find ids that are within 25 of the last one



}


module.exports.save = save;