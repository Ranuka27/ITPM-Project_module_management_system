const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    ITNumber: {
        type: String,
        required: true
    },
    criteria: {
        type: [String],
    },
    AddMarks: {
        type: [Number],
    },
    RealMarks: {
        type: [Number],
    },
    TotalMarks: {
        type: Number,
    },
    Feedback: { // Add a field for storing feedback
        type: String
    },
}, { _id : false });

const MarksheetGenSchema = new mongoose.Schema({
    assID: {
        type: String,
        required: true
    },
    GroupName: {
        type: String,
        required: true
    },
    Student: {
        type: [StudentSchema],
         
    },
    status: {
        type: String,
        default: 0
    }
});

module.exports = mongoose.model('MarksheetGen', MarksheetGenSchema);