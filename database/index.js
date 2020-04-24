const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const uniqueValidator = require('mongoose-unique-validator');


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  owner: String,
  ownerURL: String,
  repo_name: String,
  repo_url: {type: String, unique: true},
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

// Should take in an instance of Repo
// Will call that object's save method

// Going to be working with a list of objects from GitHub API

let save = (repos, callback) => {
  // TODO: Your code here
  repos.forEach(repo => {
    let record = new Repo({ owner: repo.owner.login, owner_profile: repo.owner.url, repo_name: repo.name, repo_url: repo.html_url, forks: repo.forks });

    record.save((err) => {
      if (err) {
        callback(err);
      }
      callback(null);
    });

  });
}

let find = (callback) => {

  Repo.find().sort({forks: -1}).limit(25).exec((err, results) => {
    if (err) {
      callback(err)
    }
    callback(null, results);
  });

}



// Let's also define a find function here that calls .find to access previously saved repos
// let find = () => {
//   // Repo.find({id: }) --> find ids that are within 25 of the last one



// }


module.exports.save = save;
module.exports.find = find;