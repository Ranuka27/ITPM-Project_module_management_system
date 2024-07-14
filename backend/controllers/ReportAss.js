const Assignment = require('../models/reportass');
const multer = require('multer');
const path = require('path');

// get all assignments
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get assignment by id
const getAssignmentById = async (req, res) => {
    const id = req.params.assID;
    try {
        const assignment = await Assignment.findOne({ assID: id });
        res.status(200).json(assignment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../Reupload'); // Define the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Define the file name
    }
});

// File filter to allow only PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

// Set up multer upload middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

// create assignment
const createAssignment = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No PDF file uploaded' });
        }
        //calculate the total weightage
        const assignment = await Assignment.find();
        const totalWeightage = assignment.reduce((a,b)=>a + b.weightage,0);
     
        if(totalWeightage +  Number(req.body.weightage) > 100){
            return res.status(400).json({ message: 'The total weightage must be less than or equal to 100.' });
        }
        
        const newAssignment = new Assignment({
            assID: req.body.assID,
            title: req.body.title,
            description: req.body.description,
            weightage: req.body.weightage,
            pdf: req.file.path
        });

        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = {
    getAssignments,
    getAssignmentById,
    createAssignment,
    upload // Export the upload middleware
};
