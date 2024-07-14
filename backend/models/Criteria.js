const mongoose = require('mongoose');

const CriteriaSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Criteria', CriteriaSchema);


    