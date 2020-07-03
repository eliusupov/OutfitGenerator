import React, {Component} from 'react';
import axios from 'axios';
import * as ActionsGeneral from '../../store/ActionsGeneral';
import {validatePassword, validateEmail} from '../../MainModules/helperFunctions';

import './SystemEntry.scss';

class SystemEntry extends Component {
	state = {
		mode: 'register',
		email: '',
		password: '',
		isAdmin: false,
		emailAvail: null,
		errArr: [],
		spinner: false,
	}
	copyState = null;
	
	inputHandler = (type, value) => this.setState({[type]: value});
	
	modeHandler = type => {
		this.setState(this.copyState);
		this.props.history.push(type)
	};
	
	validate = async (state) => {
		const {email, password} = state;
		const errArr = [];
		if (!email) {
			errArr.push('Please enter an email');
		} else if (!validateEmail(email)) {
			errArr.push('Please enter a valid email - example@example.com');
		} else if (this.props.match.path === '/register') {
			const emailAvail = await this.checkEmail(email);
			if (!emailAvail) {
				errArr.push('Email is taken');
			}
		}
		if (!password) {
			errArr.push('Please enter a password');
		} else if (validatePassword(password)) {
			errArr.push('No special characters');
		} else if (password.length < 5 || password.length > 12) {
			errArr.push('Password length between 5-12');
		}
		this.setState({errArr});
		return errArr.length === 0;
	};
	
	checkEmail = async (email) => {
		let emailAvail;
		try {
			const res = await axios.post('http://localhost:3000/user/checkEmail', {email});
			emailAvail = res.data;
		} catch (e) {
			const errArr = [...this.state.errArr];
			errArr.push('Email is taken');
			emailAvail = false;
		}
		this.setState({emailAvail});
		return emailAvail;
	}
	
	sendRegister = async (e, state) => {
		e.preventDefault();
		const valid = await this.validate(state);
		const {email, password} = state;
		if (!valid) return;
		this.setState({spinner: true});
		axios.post('http://localhost:3000/user/create', {email, password})
			.then(res => {
				const {success, user} = res.data;
				if (success) {
					const {_id, email, role} = user;
					ActionsGeneral.resetReuslts();
					localStorage.id = _id;
					localStorage.email = email;
					localStorage.role = role;
					this.props.history.push('/');
				} else {
					const errArr = [...this.state.errArr];
					errArr.push('Something went wrong try again later');
					this.setState({
						spinner: false,
					});
				}
			})
			.catch(err => {
			});
	}
	
	sendLogin = async (e, state) => {
		e.preventDefault();
		const valid = await this.validate(state);
		const {email, password} = state;
		if (!valid) return;
		this.setState({spinner: true});
		axios.post('http://localhost:3000/user/login', {email, password})
			.then(res => {
				const {success, user} = res.data;
				if (success) {
					const {_id, email, role} = user;
					ActionsGeneral.resetReuslts();
					localStorage.id = _id;
					localStorage.email = email;
					localStorage.role = role;
					this.props.history.push('/');
				} else {
					const errArr = [...this.state.errArr];
					errArr.push('Incorrect Email / Password, and no i dont have recovery services so youre stuck');
					this.setState({
						errArr,
						spinner: false,
					});
				}
			})
			.catch(err => {
			});
	}
	
	componentWillMount = () => {
		if (localStorage.email) this.props.history.push('/');
	}
	
	componentDidMount = () => {
		this.copyState = {...this.state};
	}
	
	render() {
		const {email, password, isAdmin, errArr, spinner} = this.state;
		return (
			<div className='system-entry'>
				<form onSubmit={e => e.preventDefault()}>
					{this.props.match.path === '/register' && <h1>Register to use the system</h1>}
					{this.props.match.path === '/login' && <h1>Login to use the system</h1>}
					<label>
						<input
							value={email}
							type="email"
							placeholder="Email"
							onChange={e => this.inputHandler('email', e.target.value)}
						/>
					</label>
					<label>
						<input
							value={password}
							type="password"
							placeholder="Password"
							onChange={e => this.inputHandler('password', e.target.value)}
						/>
					</label>
					{this.props.match.path === '/register' &&
						<div>
							<input
								checked={isAdmin}
								type="checkbox"
								onChange={e => this.inputHandler('isAdmin', e.target.checked)}
							/>
							<span>Create as Admin?</span>
						</div>
					}
					{this.props.match.path === '/register' &&
						<div className="swap" onClick={() => this.modeHandler('/login')}>
							Have a user? click here
						</div>
					}
					{this.props.match.path === '/login' &&
						<div className="swap" onClick={() => this.modeHandler('/register')}>
							Don't Have a user? click here
						</div>
					}
					{errArr.map(e => <div key={e} className="err">{e}</div>)}
					<div className="submit">
						{spinner
							? <i className="fas fa-spinner fa-spin"></i>
							: <>
								{this.props.match.path === '/register' &&
									<input
										type="submit"
										value='Submit'
										onClick={(e) => this.sendRegister(e, this.state)}
									/>
								}
								{this.props.match.path === '/login' &&
									<input
										type="submit"
										value='Login'
										onClick={(e) => this.sendLogin(e, this.state)}
									/>
								}
							</>
						}
					</div>
				</form>
			</div>
		);
	}
}

export default SystemEntry;
