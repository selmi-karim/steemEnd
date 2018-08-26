const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const steem = require('steem')
const sc2 = require('sc2-sdk')

/**
 * SteemConnect Config
 */

let steemconnect = sc2.Initialize({
    app: process.env.APP_NAME,
    callbackURL: process.env.REDIRECT_URI,
    scope: ['login', 'vote', 'comment']
});

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
        var newObject = []
        result.forEach(element => {
            element.body = getImgUrl(element.body)
            if (element.body !== null)
                newObject.push(element)
        });
        res.send(newObject)
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
        var newObject = []
        result.forEach(element => {
            element.body = getImgUrl(element.body)
            if (element.body !== null)
                newObject.push(element)
        });

        res.send(newObject)

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
        var newObject = []
        result.forEach(element => {
            element.body = getImgUrl(element.body)
            if (element.body !== null)
                newObject.push(element)
        });
        res.send(newObject)
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
        var newObject = []
        result.forEach(element => {
            element.body = getImgUrl(element.body)
            if (element.body !== null)
                newObject.push(element)
        });
        res.send(newObject)
    });
}


/* POST a vote broadcast to STEEM network. */
/*router.post('/vote', util.isAuthenticatedJSON, (req, res) => {
    let postId = req.body.postId
    let voter = req.session.steemconnect.name
    let author = req.body.author
    let permlink = req.body.permlink
    let weight = 10000

    steem.vote(voter, author, permlink, weight, function (err, steemResponse) {
      if (err) {
          res.json({ error: err.error_description })
      } else {
          res.json({ id: postId })
      }
    });

    
})
*/


/**
 * Get Posts py Hot
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function addPost(req, res) {
    const { title, body,tags } = req.query
    //console.log('tags:')
    let customData = {
        tags: JSON.parse(tags),
        app: 'steemitgram'
    }
    /*steemconnect.setAccessToken(req.user.access_token)
    steemconnect.comment('', 'steemitgram', req.user.username,title.replace(/ /g, '-'), title,body,
    customData, (err, steemResponse) => {
        if (err) {
            res.send(err)
        } else {
            res.send(steemResponse)
        }
    });*/
    res.send(req)
}
module.exports = { getUserPosts, getNew, getHot, getTrending, addPost }
