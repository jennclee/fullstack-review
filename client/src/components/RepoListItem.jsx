import React from 'react';

const RepoListItem = (props) => (
	<tr>
		<td>{props.repo.username}</td>
		<td><a href={props.repo.repo_link}>{props.repo.repo_name}</a></td>
	</tr>
)

export default RepoListItem;