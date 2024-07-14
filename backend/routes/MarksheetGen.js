const express = require('express');
const router = express.Router();
const {getMarksheet, createMarksheet,marksheetApprovel ,updateMarksheet,sum,deleteMarksheet} = require('../controllers/MarksheetGen');
const {adminAuth} = require('../middleware/auth');


router.get('/alldetails', getMarksheet);
router.post('/insertMarksheet', createMarksheet);
router.patch('/marksheetApprovel/:id',adminAuth, marksheetApprovel);
router.patch('/updateMarksheet', updateMarksheet);
router.post('/sum', sum);
router.delete('/marksheet/:id', deleteMarksheet);

module.exports = router;