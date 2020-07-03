const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		maxlength: 250,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 12,
		trim: true,
	},
	role: {
		type: Number,
		maxlength: 1,
	}
});

module.exports = mongoose.model('User', UserSchema);
