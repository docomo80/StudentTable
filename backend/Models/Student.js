const mongoose = require('mongoose');
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
    studentId:{
        type:Number
    }

});
module.exports = mongoose.model('Student',
Student);
