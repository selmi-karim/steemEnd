const express = require('express');
const mailCtrl = require('./mail.controller');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/send')
    /** GET /api/home - Get most trending posts */
    .post(validate(paramValidation.sendMail),mailCtrl.replyMail)

module.exports = router;
