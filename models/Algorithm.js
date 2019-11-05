import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Algorithm = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    runtimeComplexities: {
        type: Object
    },
    spaceComplexity: {
        type: String
    }
});

export default mongoose.model('Algorithm', Algorithm);
