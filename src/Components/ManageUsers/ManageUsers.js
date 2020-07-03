import React, {Component} from 'react';
import GeneralStore from '../../store/GeneralStore';
import * as ActionsGeneral from '../../store/ActionsGeneral';

import './ManageUsers.scss';

class ManageUsers extends Component {
	state = {
		users: GeneralStore.users,
	}
	
	updateResults = () => {
		this.setState({users: GeneralStore.users});
	}
	
	renderUsers = () => {
		const {users} = this.state;
		const usersList = users.map(e => (
			<li key={e._id}>
				<div>
					<span>Id:</span>
					{e._id}
				</div>
				<div>
					<span>Email:</span>
					{e.email}
				</div>
				<div>
					<span>Password:</span>
					{e.password}
				</div>
				<div>
					<span>Role:</span>
					{e.role == 0 ? 'Admin' : 'User'}
				</div>
				{e.role !== 0
					? <i className="far fa-trash-alt" onClick={() => ActionsGeneral.deleteUser(e._id)}></i>
					: <i className="fas fa-ban"></i>
				}
			</li>
		));
		return usersList;
	};
	
	componentDidMount = () => {
		if (!localStorage.email || localStorage.role != 0) this.props.history.push('/login');
		ActionsGeneral.getUsers();
		GeneralStore.on('change', this.updateResults);
	}
	
	componentWillUnmount = () => {
		GeneralStore.removeListener('change', this.updateResults);
	}
	
	render() {
		return (
			<div className='manage-users'>
				<h1>Manage Users</h1>
				<ul>{this.renderUsers()}</ul>
			</div>
		);
	}
	
}

export default ManageUsers;
