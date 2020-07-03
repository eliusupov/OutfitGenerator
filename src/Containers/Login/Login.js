import React, { useState } from 'react';

import classes from './Login.module.scss';

const Login = (props) => {
	const [lol2k, setLol2k] = useState('');

	return (
		<div>
			{lol2k}
			<input type="text" onChange={e => setLol2k(e.target.value)}/>
		</div>
	);
}

export default Login;
