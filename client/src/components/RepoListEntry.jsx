import React from 'react';

const RepoListEntry = (props) => (
  <div className="repo-list-entry">
    <ul className="repo">
      <li><b>Owner:</b> {props.repo.owner}</li>
      <li><b>Owner Profile:</b> <a href={props.repo.ownerURL}>{props.repo.ownerURL}</a></li>
      <li><b>Repo Name:</b> {props.repo.repo_name}</li>
      <li><b>Repo URL:</b> <a href={props.repo.repo_url}>{props.repo.repo_url}</a></li>
      <li><b>Forks:</b> {props.repo.forks}</li>
    </ul>
  </div>
);

export default RepoListEntry;