const express = require('express');
const homeCtrl = require('./post.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/trending')
    /** GET /api/home - Get most trending posts */
    .get(homeCtrl.getTrending)


router.route('/:username')
    /** GET /api/home/:userId - Get latest friends posts for specific user */
    .get(homeCtrl.getUserPosts)


router.route('/new')
    /** GET /api/home/:userId - Get most trending posts */
    .get(homeCtrl.getNew)


router.route('/hot')
    /** GET /api/home/:userId - Get latest posts liked by specific user */
    .get(homeCtrl.getHot)

module.exports = router;
