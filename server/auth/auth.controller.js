const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const sc2 = require('sc2-sdk');
/**
 * SteemConnect Config
 */

let steem = sc2.Initialize({
  app: process.env.APP_NAME,
  callbackURL: process.env.REDIRECT_URI,
  scope: ['login', 'vote', 'comment']
});

/**
 * Returns jwt token if sc2 validation
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  if (!req.query.access_token) {
    let uri = steem.getLoginURL();
    res.json(uri);
  } else {
    const token = jwt.sign({
      access_token: req.query.access_token,
      username: req.query.username
    }, config.jwtSecret);
    return res.json({
      token,
      username: req.query.username
    });
  }
  /*const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);*/
}


/**
 * destroy jwt token
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function logout(req, res) {
  // destroy jwt token
  steem.revokeToken();
  /*
  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);*/
}



module.exports = { login, logout };
