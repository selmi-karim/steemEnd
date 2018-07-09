const express = require('express');
const homeCtrl = require('./home.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/home - Get list of users */
    .get(homeCtrl.latest)


router.route('/:userId')
    /** GET /api/home/:userId - Get home */
    .get(homeCtrl.get)


router.route('/trending')
    /** GET /api/home/:userId - Get trending */
    .get(homeCtrl.trending)

router.route('/favoris/:userId')
    /** GET /api/home/:userId - Get trending */
    .get(homeCtrl.favoris)

module.exports = router;
