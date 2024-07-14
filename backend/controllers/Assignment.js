const Assignment = require('../models/Assignment');
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

//Delete assignment by id
const deleteAssignment = async (req, res) => {
    const id = req.params.assID;
    try {
        await Assignment.findOneAndDelete({ assID: id });
        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../upload'); // Define the destination folder for uploaded files
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
// create assignment
const createAssignment = async (req, res) => {
    try {
        const { assID, title, description, weightage } = req.body;

        // Check if a file was uploaded
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: 'No PDF file uploaded' });
        }

        //calculate the total weightage
        const assignment = await Assignment.find();
        const totalWeightage = assignment.reduce((a,b)=> a + b.weightage, 0);
     
        if(totalWeightage + Number(weightage) > 100){
            return res.status(400).json({ message: 'The total weightage must be less than or equal to 100.' });
        }
        
        const newAssignment = new Assignment({
            assID,
            title,
            description,
            weightage,
            pdf: req.file.path // Save the file path
        });

        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Edit assignment
const editAssignment = async (req, res) => {
    const id = req.params.assID;
    const { title, description, weightage } = req.body;
    let updatedFields = { title, description, weightage };

    // Check if a file was uploaded
    if (req.file && req.file.path) {
        const pdf = req.file.path;
        updatedFields.pdf = pdf;
    }

    try {
        const updatedAssignment = await Assignment.findOneAndUpdate({ assID: id }, updatedFields, { new: true });
        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
}

module.exports = {
    getAssignments,
    getAssignmentById,
    deleteAssignment,
    createAssignment,
    editAssignment,
    upload // Export the upload middleware
};
