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
    //const regex = /(https?:\/\/steepshot.org\/api\/[^\s]+)/g;
    const regex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
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

    

    
})
*/

/**
 * Post to steem blockchain
 * @param {Object} req 
 * @param {Object} res 
 */
function like(req, res) {
    const { voter, permlink,weight } = req.body
    const tagsToAray = tags.split('#')
    tagsToAray.pop()
    let customData = {
        tags: tagsToAray,
        app: 'steemitgram'
    }
    steemconnect.setAccessToken(req.user.access_token)
    steemconnect.vote(voter, req.user.username, permlink, weight, function (err, steemResponse) {
        if (err) {
            res.json({ error: err.error_description })
        } else {
            res.json({ id: postId })
        }
      });
    
}

/**
 * Add Like to users posts
 * @param {Object} req 
 * @param {Object} res 
 */
function addPost(req, res) {
    const { title, description,tags } = req.body
    const tagsToAray = tags.split('#')
    tagsToAray.pop()
    let customData = {
        tags: tagsToAray,
        app: 'steemitgram'
    }
    steemconnect.setAccessToken(req.user.access_token)
    steemconnect.comment('', 'steemitgram', req.user.username,title.toLowerCase().replace(/ /g, '-'), title,description,
    customData, (err, steemResponse) => {
        if (err) {
            res.send(err)
        } else {
            res.send(steemResponse)
        }
    });
}
module.exports = { getUserPosts, getNew, getHot, getTrending, addPost, like }
