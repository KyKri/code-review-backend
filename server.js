import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Algorithm from './models/Algorithm';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/codereview');

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

router.route('/algorithms/:id').get((req, res) => {
    Algorithm.findById(req.params.id, (err, algorithm) => {
        if (err) {
            console.error(err);
        }
        else {
            res.json(algorithm);
        }
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
