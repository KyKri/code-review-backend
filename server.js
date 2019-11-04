import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Algorithm from './models/Algorithm';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://[server]/issues');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/algorithms').get((req, res) => {
    Algorithm.find((err, algorithms) => {
        if (err) {
            console.error(err);
        }
        else {
            res.json(algorithms);
        }
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
