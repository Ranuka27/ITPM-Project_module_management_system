const express = require('express');
const router = express.Router();
const { getGroupreg, insertGroupreg, updateGroupreg,assignPannel,getGroupregById , getGroupregByName , deleteGroupreg} = require('../controllers/Groupreg');
 

router.get('/getGroupreg', getGroupreg);
router.get('/getGroupregById/:id', getGroupregById);
router.post('/insertGroupreg', insertGroupreg);
router.patch('/updateGroupreg/:id', updateGroupreg);
router.patch('/assignPannel',assignPannel);
router.get('/getGroupregByName/:GroupName', getGroupregByName);
router.delete('/deleteGroupreg/:id', deleteGroupreg);


module.exports = router;
