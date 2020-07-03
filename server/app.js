const express = require('express');
const bodyParser = require('body-parser');

const user = require('./routes/UserRoute');

const app = express();

//mongoose
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://eliusupov:eliusupov9422660@ds125365.mlab.com:25365/anyvisionitunesasmt';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', user);

let port = 3000;
app.listen(port, () => {
	console.log('Server is up and running ' + port);
});