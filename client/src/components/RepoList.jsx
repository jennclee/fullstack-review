import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = (props) => (
  <div>
  	<h4>Top 25 Repos:</h4>
  	<table>
    	<thead>
	    	<tr>
	    		<th>Username</th>
	    		<th>Repo</th>
	    		<th>Stargazers</th>
	    	</tr>
    	</thead>
    	<tbody>
	    	{props.repos.map( (repo, index) => <RepoListItem repo ={repo} key={index}/> )}
    	</tbody>
    </table>
    <br/>
  </div>
)

export default RepoList;