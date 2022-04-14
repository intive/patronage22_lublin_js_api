const usersExternalController = require('../controllers/usersExternalController.js');

const router = require('express').Router()

router.post('/addUserExternal', usersExternalController.addUserExternal)

router.get('/', usersExternalController.getAllUsersExternal)

router.get('/getAllActiveUsersExternal', usersExternalController.getAllActiveUsersExternal)

router.get('/:id', usersExternalController.getOneUserExternal)

router.put('/:id', usersExternalController.updateUserExternal)

router.delete('/:id', usersExternalController.deleteUserExternal)

module.exports = router