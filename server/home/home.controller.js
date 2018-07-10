const steem = require('steem');


/**
 * Get Latest friends posts of specific user.
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function get(req, res) {
    const { size = 10 } = req.query;  // by default 10 posts
    const { userName } = req.params

    const query = {
        tag: userName, // This tag is used to filter the results by a specific post tag
        limit: size, // This limit allows us to limit the overall results returned to 5
    };
    steem.api.getDiscussionsByBlog(query, function (err, result) {
        console.log(err, result);
        res.send(userName)
    });
}


/**
 * Get Latest posts.
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function latest(req, res) {
    const { size = 10 } = req.query;  // by default 10 posts
    const query = {
        tag: 'latech', // This tag is used to filter the results by a specific post tag
        limit: 5, // This limit allows us to limit the overall results returned to 5
    };
    

    res.send('ok')
}


/**
 * Get most trending posts
 * @returns {Posts[]}
 */
function trending(req, res) {

    res.send('ok')
}


/**
 * Get latest posts liked by specific user
 * @returns {Posts[]}
 */
function favoris(req, res) {

    res.send('ok')
}

module.exports = { get, latest, favoris, trending };
