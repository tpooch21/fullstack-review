import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {props.imported} repos were added based on your search.<br></br>
    Here are the top {props.repos.length} most forked repos.
    {props.repos.map(repo => {
      return <RepoListEntry repo={repo} />
    })}
  </div>
)

export default RepoList;