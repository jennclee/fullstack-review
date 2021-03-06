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
  }

  refresh () {
    $.ajax({
      method: 'GET',
      url: '/repos',
      contentType: 'application/json', 
      success: (data) => {
        console.log('Successfully got top 25 repos from database');
        this.setState({
          repos: data
        })
      },
      error: (data) => {
        console.log('Failed to get top 25 repos from database');
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      method: 'POST',
      url: '/repos',
      contentType: 'application/json', 
      data: JSON.stringify({ searchTerm: term }),
      success: (data) => {
        console.log('Successfully posted search');
        this.refresh()
      },
      error: (data) => {
        console.log('Failed to post search');
      }
    });
  }

  componentDidMount () {
    console.log('component mounted');
    this.refresh()
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