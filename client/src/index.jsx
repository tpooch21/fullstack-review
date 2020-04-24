import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      success: (repos) => {
        this.setState({
          repos
        });
      },
      error: () => {
        console.log('Error fetching data from server');
      }
    })

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
        console.log('User repos posted successfully => ', data);
      },
      error: () => {
        console.log('Error posting data to server');
      }
    });

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));