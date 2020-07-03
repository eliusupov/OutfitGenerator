const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ResultsSchema = new Schema({
	userId: {
		type: String,
		required: true,
		trim: true,
	},
	results: {
		type: Object,
		required: true,
	},
	searchString: {
		type: String,
		required: true,
		trim: true,
	},
	topTen: {
		type: Object,
		required: true,
	}
});

module.exports = mongoose.model('Results', ResultsSchema);
