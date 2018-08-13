const express = require('express');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/profile/:username')
  /** GET /api/users - Get user profil */
  .get(userCtrl.getUserProfil)

router.route('/imgprofile/:username')
  /** GET /api/users - Get user profil */
  .get(userCtrl.getImgProfil)

router.route('/follow/:username')
  /** GET /api/users - Get list of users */
  .get(userCtrl.followUser)

router.route('/unfollow/:username')
  /** GET /api/users - Get list of users */
  .get(userCtrl.unfollowUser)

router.route('/getFollowCount/:username')
  /** GET /api/users - Get list of users */
  .get(userCtrl.getFollowCount)

router.route('/getUserArticles/:username')
  /** GET /api/users - Get list of users */
  .get(userCtrl.getUserArticles)

module.exports = router;
