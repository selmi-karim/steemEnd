const express = require('express');
const homeCtrl = require('./post.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/trending')
    /** GET /api/home - Get most trending posts */
    .get(homeCtrl.getTrending)


router.route('/username/:username')
    /** GET /api/home/:userId - Get Latest posts of specific user. */
    .get(homeCtrl.getUserPosts)


router.route('/new')
    /** GET /api/home/:userId - Get most trending posts */
    .get(homeCtrl.getNew)


router.route('/hot')
    /** GET /api/home/:userId - Get latest posts liked by specific user */
    .get(homeCtrl.getHot)


router.route('/addPost')
    .get(expressJwt({ secret: config.jwtSecret }),homeCtrl.addPost)
module.exports = router;
