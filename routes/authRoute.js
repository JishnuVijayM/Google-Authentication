const express = require('express');
const { registerUser, googleAuth, loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser );
router.post('/google', googleAuth );
router.post('/login', loginUser );



module.exports = router;