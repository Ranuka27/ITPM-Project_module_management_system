const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    }
    ,
    pannel:{
        type: [String]
    }
    ,
    projectgroup:{
        type: [String]
    },
    passwordResetstatus:{
        type: Boolean,
        default: false
    }

    
});

module.exports = mongoose.model('Users', UsersSchema);
