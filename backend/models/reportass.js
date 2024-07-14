const mongoose = require('mongoose');

const reportAss = new mongoose.Schema({
        assID: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        weightage: {
            type: Number,
            required: true
        },
        pdf: {
            type: String,
            required: true
        },
    })
   
module.exports = mongoose.model('ReportAss', reportAss);




// {
//     pdf : String,
//     title : String,
// },

// {collection: 'assignments'}
// );