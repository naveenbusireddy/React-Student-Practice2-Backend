const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    studentName: {
        required: true,
        type: String
    },
    university: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('student-practice2', dataSchema);