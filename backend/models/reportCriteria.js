const mongoose = require('mongoose');

const reportCriteria = new mongoose.Schema({
    assID: {
        type: String,
        required: true
    },

    criteria: {
        type: [String],
    },
    
    marks: {
        type: [Number],
    }

});

module.exports = mongoose.model('reportCriteria', reportCriteria);


    