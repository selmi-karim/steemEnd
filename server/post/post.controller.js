const steem = require('steem')


/**
 * private function to extract img from text
 */

function getImgUrl(text) {
    const regex = /(https?:\/\/steepshot.org\/api\/[^\s]+)/g;
    return text.replace(')', ' ').match(regex)
}
/**
 * Get Latest posts of specific user.
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function getUserPosts(req, res) {
    const { size = 10 } = req.query  // by default 10 posts
    const { username } = req.params

    const query = {
        tag: username, // This tag is used to filter the results by a specific post tag
        limit: size, // This limit allows us to limit the overall results returned to 5
    };
    steem.api.getDiscussionsByBlog(query, function (err, result) {
        console.log(err, result)
        var ss = []
        result.forEach(element => {
            const obj = {
                title: element.title, body: getImgUrl(element.body), url: element.url, pending_payout_value: element.pending_payout_value,
                net_votes: element.net_votes
            }
            ss.push(obj)
        });

        res.send(ss)
    });
}


/**
 * Get Latest posts.
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function getNew(req, res) {
    const { size = 10 } = req.query  // by default 10 posts
    const query = {
        tag: 'steepshot', // This tag is used to filter the results by a specific post tag
        limit: size, // This limit allows us to limit the overall results returned to 5
    };
    steem.api.getDiscussionsByCreated(query, function (err, result) {
        console.log(err, result)
        var ss = []
        result.forEach(element => {
            const obj = {
                title: element.title, body: getImgUrl(element.body), url: element.url, pending_payout_value: element.pending_payout_value,
                net_votes: element.net_votes
            }
            ss.push(obj)
        });

        res.send(ss)

    });
}


/**
 * Get Posts by Trending
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function getTrending(req, res) {
    const { size = 10 } = req.query  // by default 10 posts
    const query = {
        tag: 'steepshot', // This tag is used to filter the results by a specific post tag
        limit: size, // This limit allows us to limit the overall results returned to 5
    };
    steem.api.getDiscussionsByTrending(query, function (err, result) {
        console.log(err, result)
        var ss = []
        result.forEach(element => {
            const obj = {
                title: element.title, body: getImgUrl(element.body), url: element.url, pending_payout_value: element.pending_payout_value,
                net_votes: element.net_votes
            }
            ss.push(obj)
        });

        res.send(ss)
    });
}


/**
 * Get Posts py Hot
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function getHot(req, res) {
    const { size = 10 } = req.query  // by default 10 posts
    const query = {
        tag: 'steepshot', // This tag is used to filter the results by a specific post tag
        limit: size, // This limit allows us to limit the overall results returned to 5
    };
    steem.api.getDiscussionsByHot(query, function (err, result) {
        console.log(err, result)
        var ss = []
        result.forEach(element => {
            const obj = {
                title: element.title, body: getImgUrl(element.body), url: element.url, pending_payout_value: element.pending_payout_value,
                net_votes: element.net_votes
            }
            ss.push(obj)
        });

        res.send(ss)
    });
}

module.exports = { getUserPosts, getNew, getHot, getTrending }
