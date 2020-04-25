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


let save = (repos, callback) => {
  // TODO: Your code here
  let importedCount = 0;

  repos.forEach(repo => {
    let record = new Repo({ owner: repo.owner.login, ownerURL: repo.owner.html_url, repo_name: repo.name, repo_url: repo.html_url, forks: repo.forks });

    record.save((err) => {
      if (err) {
        console.log('Logging error on insertion => ', err);
        callback(err, null);
      } else {
        console.log('Repo inserted successfully');
        importedCount++;
        if (importedCount === repos.length) {
          callback(null, importedCount);
        }
      }
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


module.exports.save = save;
module.exports.find = find;