import React from 'react';

const RepoListEntry = (props) => (
  <div className="repo-list-entry">
    <ul className="repo">
      <li>Owner: {props.repo.owner}</li>
      <li>Repo Name: {props.repo.repo_name}</li>
      <li>Repo URL: {props.repo.repo_url}</li>
      <li>Forks: {props.repo.forks}</li>
    </ul>
  </div>
);

export default RepoListEntry;