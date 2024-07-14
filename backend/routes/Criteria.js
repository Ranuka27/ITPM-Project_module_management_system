const express = require('express');
const router = express.Router();
const criteriaController = require('../controllers/Criteria');
const {adminAuth} = require('../middleware/auth');

router.get('/getC' , criteriaController.getCriteria);
router.get('/getC/:assID', criteriaController.getCriteriaByAssID);
router.post('/insertCriteria',  criteriaController.createCriteria);
router.patch('/updateCriteria', criteriaController.updateCriteria);

// // Update criteria by assignment ID
// router.patch('/updateCriteria/:assID', async (req, res) => {
//     const { assID } = req.params;
//     const { criteria, marks } = req.body;
//     try {
//         let existingCriteria = await Criteria.findOne({ assID });
//         if (!existingCriteria) {
//             return res.status(404).json({ message: 'Criteria not found for the given assignment ID' });
//         }
//         existingCriteria.criteria = criteria;
//         existingCriteria.marks = marks;
//         await existingCriteria.save();
//         res.status(200).json(existingCriteria);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Delete criteria by assignment ID
// router.delete('/deleteCriteria/:assID', async (req, res) => {
//     const { assID } = req.params;
//     try {
//         const deletedCriteria = await Criteria.findOneAndDelete({ assID });
//         if (!deletedCriteria) {
//             return res.status(404).json({ message: 'Criteria not found for the given assignment ID' });
//         }
//         res.status(200).json({ message: 'Criteria deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });



module.exports = router;