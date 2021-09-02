const express = require('express');
const router = express.Router();
const {createUser, logInUser} = require('../../auth')

const db = require('../../dbinstance')


router.post('/createuser',createUser(db.getInstance()))

router.post('/login',logInUser(db.getInstance()))



module.exports = router;