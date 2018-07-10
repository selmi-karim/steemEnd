const express = require('express');
const homeCtrl = require('./home.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/home - Get most trending posts */
    .get(homeCtrl.trending)


router.route('/:userName')
    /** GET /api/home/:userId - Get latest friends posts for specific user */
    .get(homeCtrl.get)


router.route('/latest')
    /** GET /api/home/:userId - Get most trending posts */
    .get(homeCtrl.latest)


router.route('/favoris/:userName')
    /** GET /api/home/:userId - Get latest posts liked by specific user */
    .get(homeCtrl.favoris)

module.exports = router;
