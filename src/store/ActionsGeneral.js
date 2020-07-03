import dispatcher from './dispatcher';
import axios from 'axios';

export function dispatchResults(results = [], searchString = '', topTen = {}) {
	dispatcher.dispatch({
		type: 'GET_SEARCH_RESULTS',
		results,
		searchString,
		topTen,
	});
}
export function dispatchSpinner(bool) {
	dispatcher.dispatch({
		type: 'SPINNER',
		spinner: bool,
	});
}

export function dispatchError(errorMsg) {
	dispatcher.dispatch({
		type: 'ERROR',
		error: errorMsg,
	});
}

export function getResults(userId) {
	dispatchSpinner(true);
	axios.get(`http://localhost:3000/user/getResult/${userId}`)
		.then(res => {
			const {success, result} = res.data;
			const {results, searchString, topTen} = result;
			if (success) {
				dispatchResults(results, searchString, topTen);
			}
			dispatchSpinner(false);
		})
		.catch(err => {
			dispatchSpinner(false);
		})
}

export function saveResult(userId, results, searchString, topTen) {
	axios.post('http://localhost:3000/user/saveResult', {userId, results, searchString, topTen})
		.catch(err => {
		
		})
}

export function fetchResults(userId, e, string, topTen) {
	e.preventDefault();
	dispatchResults([], string, topTen);
	if (string) {
		dispatchError('');
		dispatchSpinner(true);
		if (topTen[string]) {
			topTen[string] += 1;
		} else {
			topTen[string] = 1;
		}
		axios.get(`https://itunes.apple.com/search?term=${string}&limit=25`)
			.then(res => {
				const {results, resultCount} = res.data;
				const mappedData = results.map((e, i) => {
					e.id = i;
					return e;
				});
				dispatchSpinner(false);
				if (resultCount === 0) {
					dispatchError(`Sorry, no results found for ${string}.`);
					saveResult(userId, [], '', topTen);
					return;
				}
				dispatchResults(results, string, topTen);
				saveResult(userId, results, string, topTen);
			})
			.catch(err => {
				dispatchError('There was a problem with the request please try again later.');
				dispatchSpinner(false);
			});
	} else {
		saveResult(userId, [], string, topTen);
		dispatchError('');
		dispatchSpinner(false);
	}
}

export function getUsers() {
	axios.get('http://localhost:3000/user/get')
		.then(res => {
			const {success, users} = res.data;
			if (success) {
				dispatcher.dispatch({
					type: 'GET_USERS',
					users,
				});
			}
		})
		.catch(err => {
		});
}

export function deleteUser(userId) {
	axios.delete(`http://localhost:3000/user/delete/${userId}`)
		.then(res => {
			const {success ,id} = res.data;
			if (success) {
				dispatcher.dispatch({
					type: 'DELETE_USER',
					id,
				});
			}
		})
		.catch(err => {
		});
}

export function resetReuslts() {
	dispatcher.dispatch({
		type: 'RESET_RESULTS',
	});
}
