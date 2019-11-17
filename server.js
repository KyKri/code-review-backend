import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Algorithm from './models/Algorithm';
import { runInNewContext } from 'vm';

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

router.route('/algorithms/add').post((req, res) => {
    let algorithm = new Algorithm(req.body);

    algorithm.save()
        .then(algorithm => {
            res.status(200).json({'message': 'Added successfully.'});
        })
        .catch(err => {
            res.status(400).json({'message': 'Failed to create new record.'});
        });
});

router.route('/algorithms/update/:id').post((req, res) => {
    Algorithm.findById(req.params.id, (err, algorithm) => {
        if (!algorithm) {
            return next(new Error('Could not load document.'));
        }
        else {
            algorithm.name = req.body.name;
            algorithm.description = req.body.description;
            algorithm.runtimeComplexities = req.body.runtimeComplexities;
            algorithm.spaceComplexity = req.body.spaceComplexity;

            algorithm.save()
                .then(algorithm => {
                    res.json({'message': 'Updated successfully.'});
                })
                .catch(err => {
                    res.status(400).json({'message': 'Failed to update record.'});
                });
        }
    });
});

router.route('/algorithms/delete/:id').get((req, res) => {
    Algorithm.findByIdAndRemove({_id: req.params.id}, (err, algorithm) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({'message': 'Deleted successfully.'});
        }
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
