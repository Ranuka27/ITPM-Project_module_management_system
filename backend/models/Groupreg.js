const mongoose = require('mongoose');
const Pannel = require('./Pannel');

const GroupregSchema = mongoose.Schema({
    GroupName: {
        type: String,
        required: true
    },
    AssTitle: {
        type: String,
        required: true
    },
    Leader:{
        type: String,
        required: true
    },
   
    Contact:{
        type: String,
        required: true
    },
    Member1:{
        type: String,
        required: true
    },
    Member2:{
        type: String,
        required: true
    },
    Member3:{
        type: String,
        required: true
    },
    Pannel:{
        type: String,
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    specialization:{
        type: String,
        required: true
    },
    researcharea:{
        type: String,
        required: true
    },
    supervisor:{
        type: String,
        required: true
    },
    cosupervisor:{
        type: String,
        required: true
    },


});

module.exports = mongoose.model('Groupreg', GroupregSchema);
