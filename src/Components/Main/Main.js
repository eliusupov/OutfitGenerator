import React, {Component} from 'react';
import {Link} from "react-router-dom";
import GeneralStore from '../../store/GeneralStore';
import * as ActionsGeneral from '../../store/ActionsGeneral';

import './Main.scss';

class Main extends Component {
	state = {
		searchString: '',
		results: [],
		error: '',
		showTopTen: false,
		topTen: {},
		spinner: false,
	}
	
	inputHandler = searchString => this.setState({searchString});
	
	showTopTenHandler = () => {
		if (Object.keys(this.state.topTen).length > 0) {
			this.setState({showTopTen: !this.state.showTopTen})
		} else {
			this.setState({error: 'Please search first'});
		}
	};
	
	logOut = () => {
		localStorage.clear();
		this.props.history.push('/login');
	};
	
	updateResults = () => {
		this.setState({
			results: GeneralStore.results,
			topTen: GeneralStore.topTen,
			searchString: GeneralStore.searchString,
			error: GeneralStore.error,
			spinner: GeneralStore.spinner
		});
	}
	
	renderTopTen = () => {
		const {topTen} = this.state;
		const topTenList = Object.keys(topTen)
			.sort((a, b) => topTen[b] - topTen[a])
			.map((e, i) => {
				if (i < 10) {
					return <li key={e}>{e} - {topTen[e]}</li>;
				}
			});
		return topTenList;
	};
	
	renderResults = () => {
		const {results} = this.state;
		const resultsList = results.map((e, i) => {
			const betterPic = e.artworkUrl100.replace('100x100', '480x480');
			return (
				<div
					key={i}
					className="item"
					data={e}
					onClick={() => this.props.history.push(`/item/${i}`)}
				>
					<img src={betterPic} alt={e.collectionName}/>
					<div className="item-details">
						<div className="artist">{e.artistName}</div>
						<div className="name">{e.trackName}</div>
						<div className="collection">{e.collectionName}</div>
					</div>
					{e.trackName}
				</div>
			);
		});
		return resultsList;
	};
	
	componentWillMount = () => {
		if (!localStorage.email) this.props.history.push('/login');
	}
	
	componentDidMount = () => {
		if (GeneralStore.searchString === '') {
			ActionsGeneral.getResults(localStorage.id);
		}
		this.updateResults();
		GeneralStore.on('change', this.updateResults);
	}
	
	componentWillUnmount = () => {
		GeneralStore.removeListener('change', this.updateResults);
	}
	
	render() {
		const {showTopTen, searchString, topTen, spinner, error} = this.state;
		return (
			<div className='main'>
				{localStorage.role == 0 &&
				<div
					className="manage-users-secret"
					onClick={() => this.props.history.push('/manageusers')}
				>
					Manage Users
				</div>
				}
				<div
					className="log-out"
					onClick={() => this.logOut()}
				>
					Logout
				</div>
				<h1>iTunes Search</h1>
				<div className="top-ten-container">
					<button
						className="top-ten-btn"
						onClick={() => this.showTopTenHandler()}
					>
						{showTopTen
							? 'Hide Top 10 Searches'
							: 'Show Top 10 Searches'
						}
					</button>
					{showTopTen && <ul className="top-ten-list">{this.renderTopTen()}</ul>}
				</div>
				<form onSubmit={e => e.preventDefault()}>
					<input
						className="search-input"
						type="text"
						value={searchString}
						placeholder="Search the iTunes store"
						onChange={e => this.inputHandler(e.target.value)}
					/>
					<input
						type="submit"
						className="search-input-button"
						value="Search"
						onClick={e => ActionsGeneral.fetchResults(localStorage.id, e, searchString, topTen)}
					/>
				</form>
				{spinner
					? <i className="fas fa-spinner fa-spin fa-2x"></i>
					: <div className="items-container">{this.renderResults()}</div>
				}
				{error && <div>{this.state.error}</div>}
			</div>
		);
	}
}

export default Main;
