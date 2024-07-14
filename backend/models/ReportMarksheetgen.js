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
    }
    
     
}, { _id : false });

const ReportMarksheetgen = new mongoose.Schema({
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
    },
    feedback: {
        type: String,
    }
});

module.exports = mongoose.model('ReportMarksheetgen', ReportMarksheetgen);