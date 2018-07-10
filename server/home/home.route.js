const express = require('express');
const homeCtrl = require('./home.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/home - Get list of users */
    .get(homeCtrl.trending)


router.route('/:userName')
    /** GET /api/home/:userId - Get latest friends posts for specific user */
    .get(homeCtrl.get)


router.route('/new')
    /** GET /api/home/:userId - Get most trending posts */
    .get(homeCtrl.new)


router.route('/favoris/:userName')
    /** GET /api/home/:userId - Get latest posts liked by specific user */
    .get(homeCtrl.favoris)

module.exports = router;
