const User = require('../models/UserModel');
const Results = require('../models/ResultsModel');

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

exports.userGetAll = async (req, res, next) => {
	try {
		const users = await User.find();
		res.send({
			success: true,
			users,
		});
	} catch (err) {
		res.send({success: false});
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

exports.userGetResult = async (req, res, next) => {
	const {userId} = req.params;
	try {
		const result = await Results.findOne({userId});
		if (result) {
			res.send({
				result,
				success: true,
			});
		} else {
			res.send({success: false});
		}
	} catch (err) {
		return next(err);
	}
};

exports.userSaveResult = async (req, res, next) => {
	const {userId, results, searchString, topTen} = req.body;
	const newResult = new Results(
		{
			userId,
			results,
			searchString,
			topTen,
		}
	);
	try {
		const result = await Results.findOne({userId});
		if (!result) {
			try {
				const result = await newResult.save();
				res.send({
					result,
					success: true,
				});
			} catch (err) {
				return next(err);
			}
		} else {
			this.userUpdateResult(req, res, next);
		}
	} catch (err) {
		return next(err);
	}
};

exports.userUpdateResult = async (req, res, next) => {
	const {userId, results, searchString, topTen} = req.body;
	const newResult = {
		userId,
		results,
		searchString,
		topTen,
	};
	try {
		const result = await Results.findOneAndUpdate({userId}, newResult);
		res.send({success: true});
	} catch (err) {
		return next(err);
	}
};
