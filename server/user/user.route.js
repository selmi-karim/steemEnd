const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/info/:username')
  /** GET /api/users - Get list of users */
  .get(userCtrl.getUserProfil)

router.route('/follow/:username')
  /** GET /api/users - Get list of users */
  .get(userCtrl.followUser)

router.route('/unfollow/:username')
  /** GET /api/users - Get list of users */
  .get(userCtrl.unfollowUser)


module.exports = router;
