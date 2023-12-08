const express = require('express')

const router = express.Router()

const adminerHandler = require('../routerHandler/adminerHandler')

router.get('/getAllUser',adminerHandler.getAllUser)

router.get('/getUserCount',adminerHandler.getUserCount)

router.post('/updateUserType',adminerHandler.updateUserType)

module.exports = router

