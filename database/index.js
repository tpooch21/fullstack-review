const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// const db = mongoose.connection;

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // owner: string
  // ownerURL: string
  // repo_name: string
  // repo_url: string
  // forks: number

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
        callback(err)
      }
      callback(null);
    });

  });

}

// Let's also define a find function here that calls .find to access previously saved repos
let find = () => {
  // Repo.find({id: }) --> find ids that are within 25 of the last one



}


module.exports.save = save;