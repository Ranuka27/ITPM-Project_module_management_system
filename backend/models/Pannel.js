const mongoose = require('mongoose');

const PannelSchema = new mongoose.Schema({
    pannelName:{
        type: String,
        required: true
    },
    pannelMember1:{
        type: String,
        required: true
    },
    pannelMember2:{
        type: String,
        required: true
    },
    pannelMember3:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true,
    },
    startTime:{
        type: String,
        required: true
    },
    endTime:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Pannel', PannelSchema);