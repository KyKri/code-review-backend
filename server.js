let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://codereview/algorithms');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Database connection successful.");
});

app.use('/', router);

app.listen(4000, () => {
    console.log('Express server running on port 4000.')
});