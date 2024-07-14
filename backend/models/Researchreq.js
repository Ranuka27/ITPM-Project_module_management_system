const mongoose = require('mongoose');

const Researchreq = new mongoose.Schema({
     
    groupnumber:{
        type:String,
        required:true,
    },

    title:{
        type:String,
        required:true,
    },
    student1:{
        type:String,
        required:true,
       
    },
    student2:{
        type:String,
        required:true,
       
    },

    student3:{
        type:String,
        required:true,
       
    },

    student4:{
        type:String,
        required:true,
       
    },

    cosupervisor:{
        type:String,
        required:true,
       
    },

    supervisor:{
        type:String,
        required:true,
       
    },
    conferencename:{
        type:String,
        required:true
    },
    issn:{
        type:String,
        required:true                
    },
    googlescholarlink:{
        type:String,
        required:true                
    },

    scopuslink:{
        type:String,
        required:true                
    },

    payment:{
        type:String,
        required:true                
    },

    registrationpdf: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: 'Pending'
      }
   
},
);

module.exports = mongoose.model('Researchreq',Researchreq);