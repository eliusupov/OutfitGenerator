const validatePassword = (password) => {
	if (password) {
		const regExp = /[^A-Za-z0-9]+/g;
		return regExp.test(password);
	}
};

const validateEmail = (email) => {
	if (email) {
		email.toLowerCase();
		const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		return regExp.test(email);
	}
};

export {validatePassword, validateEmail};