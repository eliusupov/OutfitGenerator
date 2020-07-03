import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Router, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import "@babel/polyfill";

import Main from './src/Components/Main/Main';
import SingleItem from './src/Components/SingleItem/SingleItem';
import SystemEntry from './src/Components/SystemEntry/SystemEntry';
import ManageUsers from './src/Components/ManageUsers/ManageUsers';
import NotFound from './src/Components/NotFound/NotFound';

import './style.scss';

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/404" component={NotFound} />
			<Route exact path="/" component={Main} />
			<Route exact path="/register" component={SystemEntry} />
			<Route exact path="/login" component={SystemEntry} />
			<Route exact path="/manageusers" component={ManageUsers} />
			<Route exact path="/item/:id" component={SingleItem} />
			<Redirect to={'/404'}/>
		</Switch>
	</BrowserRouter>
);

hot(module)(App);

ReactDOM.render(<App/>, document.getElementById('root'));
