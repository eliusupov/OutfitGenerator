import { hot } from 'react-hot-loader/root';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './src/Containers/Login/Login';

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Login} />
		</Switch>
	</BrowserRouter>
);

export default hot(App);
