const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/AuthController');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post("/login", [
    check('email', 'The email is required.'),
    check('password', 'The password is required.'),
    check('password', 'The password length is not valid.').isLength({ min: 6 }),
    validateFields
], login);

module.exports = router