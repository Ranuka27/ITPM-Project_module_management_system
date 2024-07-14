const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { getAssignments, getAssignmentById, createAssignment, upload } = require('../controllers/ReportAss');


router.get('/all/:assID',  getAssignmentById);
router.get('/all',  getAssignments);
router.post('/insertAss' ,upload.single('pdf'),  createAssignment);

module.exports = router;
