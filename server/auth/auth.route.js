const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('../../config/param-validation');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

/** Get /api/auth/login - Redirection to SteemConnect if no token (JWT) exist */
router.route('/login')
  .get(authCtrl.login)

/** GET /api/auth/logout - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/logout')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.logout);

module.exports = router;

