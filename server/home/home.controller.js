const steem = require('steem');




/**
 * Get user
 * @returns {Posts[]}
 */
function get(req, res) {


}


/**
 * Get Latest posts.
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function latest(req, res, next) {
    const { size = 10 } = req.query;  // by default 10 posts
    /*User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));*/
}


/**
 * Get most trending posts
 * @returns {Posts[]}
 */
function trending(req, res) {
}


/**
 * Get latest posts liked by specific user
 * @returns {Posts[]}
 */
function favoris(req, res) {

}

module.exports = { get, latest, favoris, trending };
