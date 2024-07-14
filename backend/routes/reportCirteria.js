const express = require('express');
const router = express.Router();
const criteriaController = require('../controllers/ReportCriteria');
const {adminAuth} = require('../middleware/auth');

router.get('/getC' , criteriaController.getCriteria);
router.get('/getC/:assID', criteriaController.getCriteriaByAssID);
router.post('/insertCriteria',  criteriaController.createCriteria);
router.patch('/updateCriteria', criteriaController.updateCriteria);

module.exports = router;