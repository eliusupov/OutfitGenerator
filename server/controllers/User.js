const User = require('../models/UserModel');

exports.userCreate = async (req, res, next) => {
	const {email, password, role} = req.body;
	const newUser = new User(
		{
			email,
			password,
			role,
		}
	);
	try {
		const user = await User.findOne({email});
		if (!user) {
			try {
				const user = await newUser.save();
				res.send({
					user: user,
					success: true,
				});
			} catch (err) {
				return next(err);
			}
		} else {
			res.send({success: false});
		}
	} catch (err) {
		return next(err);
	}
};

exports.userLogin = async (req, res, next) => {
	const {email, password} = req.body;
	try {
		const user = await User.findOne({email, password});
		res.send({
			success: !!user,
			user,
		});
	} catch (err) {
		return next(err);
	}
};

exports.userDeleteSingle = async (req, res, next) => {
	const {id} = req.params;
	try {
		const user = await User.findOneAndDelete({_id: id});
		if (user) {
			res.send({
				success: true,
				id: user._id,
			});
		} else {
			res.send({success: false});
		}
	} catch (err) {
		return next(err);
	}
};

exports.userCheckEmailAvail = async (req, res, next) => {
	const {email} = req.body;
	try {
		const user = await User.findOne({email});
		res.send(!user);
	} catch (err) {
		return next(err);
	}
};