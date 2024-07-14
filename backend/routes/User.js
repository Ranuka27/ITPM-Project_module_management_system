const express = require('express');
const router = express.Router();
const {registerUser,loginUser,updateUserRole,viewAllUsers,resetPassword,removeUser,findUserPasswordResetStatus,viewUserprofile} = require('../controllers/User');
const {adminAuth} = require('../middleware/auth');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/updateRole/:id', updateUserRole);
router.get('/viewAllUsers', viewAllUsers);
router.patch('/resetPassword', resetPassword);
router.delete('/removeUser/:id', removeUser);
router.post('/findUserPasswordResetStatus', findUserPasswordResetStatus);
router.get('/viewUserprofile', viewUserprofile);

module.exports = router;