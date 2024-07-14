const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { getAssignments, getAssignmentById, createAssignment, upload, editAssignment, deleteAssignment } = require('../controllers/Assignment');


router.get('/all/:assID',  getAssignmentById);
router.get('/all',  getAssignments);
router.post('/insertAss' ,upload.single('pdf'),  createAssignment);
router.patch('/assignments/:assID',upload.single('pdf'), editAssignment);
router.delete('/delete/:assID', deleteAssignment);

module.exports = router;












// // Multer configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/') // Destination folder where files will be stored
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname) // Set the file name to be the original name
//     }
// });

// const upload = multer({ storage: storage });

// // Route for uploading PDF file
// router.post('/upload', upload.single('pdf'), assignmentController.uploadAssignment);

// module.exports = router;
