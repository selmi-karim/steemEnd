const steem = require('steem')

/**
 * Get Latest posts of specific user.
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function get(req, res) {
    const { size = 10 } = req.query  // by default 10 posts
    const { userName } = req.params

    const query = {
        tag: userName, // This tag is used to filter the results by a specific post tag
        limit: size, // This limit allows us to limit the overall results returned to 5
    };
    steem.api.getDiscussionsByBlog(query, function (err, result) {
        console.log(err, result)
        res.send(result)
    });
}


/**
 * Get Latest posts.
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function latest(req, res) {
    const { size = 10 } = req.query  // by default 10 posts
    const query = {
        tag: 'photography', // This tag is used to filter the results by a specific post tag
        limit: size, // This limit allows us to limit the overall results returned to 5
    };
    steem.api.getDiscussionsByCreated(query, function (err, result) {
        console.log(err, result)
        /*result.forEach(element => {
            ss.push(element.title)
            ss.push(element.body)
        });*/
        res.send(result)
        
    });
}


/**
 * Get Posts by Trending
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function trending(req, res) {
    const { size = 10 } = req.query  // by default 10 posts
    const query = {
        tag: 'photography', // This tag is used to filter the results by a specific post tag
        limit: size, // This limit allows us to limit the overall results returned to 5
    };
    steem.api.getDiscussionsByTrending(query, function (err, result) {
        console.log(err, result)
        /*result.forEach(element => {
            ss.push(element.title)
            ss.push(element.body)
        });*/
        res.send(result)
        
    });
}


/**
 * Get Posts py Hot
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function hot(req, res) {
    const { size = 10 } = req.query  // by default 10 posts
    const query = {
        tag: 'photography', // This tag is used to filter the results by a specific post tag
        limit: size, // This limit allows us to limit the overall results returned to 5
    };
    steem.api.getDiscussionsByHot(query, function (err, result) {
        console.log(err, result)
        /*result.forEach(element => {
            ss.push(element.title)
            ss.push(element.body)
        });*/
        res.send(result)
        
    });
}

module.exports = { get, latest, favoris, trending }
