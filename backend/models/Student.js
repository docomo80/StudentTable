const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/');

const Schema = mongoose.Schema;

let Student = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    year: {
        type: Number
    },
    id: {
        type: Number
    }
});

module.exports = mongoose.model('Student',
    Student);
