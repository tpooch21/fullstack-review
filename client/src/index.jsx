import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      imported: 0
    }

    this.search = this.search.bind(this);
    this.getTopRepos = this.getTopRepos.bind(this);
  }

  // Refer to ajax request within different function

  componentDidMount() {
    this.getTopRepos(0);
  }

  getTopRepos(imported) {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      success: (repos) => {
        this.setState({
          repos,
          imported
        });
      },
      error: () => {
        console.log('Failed to fetch data from the server');
      }
    });

  }


  search (term) {
    console.log(`${term} was searched`);
    // TODO

    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      data: {
        username: term
      },
      success: (data) => {
        // var imported = JSON.parse(data);
        console.log('Logging type of imported data => ', typeof data);
        this.getTopRepos(data.count); // {repoInfo: 20}.repoInfo --> 20
      },
      error: () => {
        console.log('Error posting data to server');
      }
    });

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} imported={this.state.imported}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));