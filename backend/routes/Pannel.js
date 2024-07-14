const { getPannel, createPannel , editPannel ,deletePannel,getPannelwithid} = require('../controllers/Pannel');
const express = require('express');
const router = express.Router();

router.get('/getPannel', getPannel);
router.post('/createPannel', createPannel);
router.patch('/editPannel/:pannelName', editPannel);
router.delete('/deletePannel/:pannelName', deletePannel);
router.get('/getPannel/:id', getPannelwithid);



module.exports = router;