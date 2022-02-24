const authController = require('../controllers/authController.js')
const { validateRegistration, validateLogin } = require('../middleware/authValidator.js')


const router = require('express').Router()

router.post('/register', validateRegistration, authController.register)

router.post('/login', validateLogin, authController.login)

router.get('/logout', authController.logout)

module.exports = router