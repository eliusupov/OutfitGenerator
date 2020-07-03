import { EventEmitter } from 'events';
import dispatcher from './dispatcher';
import * as ActionsGeneral from './ActionsGeneral';

class GeneralStore extends EventEmitter {
	results = [];
	searchString = '';
	topTen = {};
	spinner = false;
	error = '';
	users = [];
	
	handleActions (action) {
		switch (action.type) {
			case "GET_SEARCH_RESULTS": {
				this.results = action.results;
				this.searchString = action.searchString;
				this.topTen = action.topTen;
				this.emit('change');
				break;
			}
			case "RESET_RESULTS": {
				this.results = [];
				this.searchString = '';
				this.topTen = {};
				this.emit('change');
				break;
			}
			case "GET_USERS": {
				this.users = action.users;
				this.emit('change');
				break;
			}
			case "DELETE_USER": {
				this.users = this.users.filter(e => e._id != action.id);
				this.emit('change');
				break;
			}
			case "SPINNER": {
				this.spinner = action.spinner;
				this.emit('change');
				break;
			}
			case "ERROR": {
				this.error = action.error;
				this.emit('change');
				break;
			}
		}
	}
}

const generalStore = new GeneralStore;
generalStore.setMaxListeners(Infinity);

dispatcher.register(generalStore.handleActions.bind(generalStore));

export default generalStore;
