const Router = require('express').Router;
const UserService = require('../service/user-service')

const router = new Router();

router.post('/registration', UserService.registration);
router.post('/login');
router.post('/logout');
router.get('/activate/:link');
router.get('/refresh');
router.get('/users');

module.exports = router
