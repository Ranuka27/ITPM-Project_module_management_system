const express = require('express');
const router = express.Router();
const {getMarksheet, createMarksheet,marksheetApprovel ,updateMarksheet,sum} = require('../controllers/ReportMarksheetGen');
const {adminAuth} = require('../middleware/auth');


router.get('/alldetails', getMarksheet);
router.post('/insertMarksheet', createMarksheet);
router.patch('/marksheetApprovel/:id',adminAuth, marksheetApprovel);
router.patch('/updateMarksheet', updateMarksheet);
router.post('/sum', sum);

module.exports = router;