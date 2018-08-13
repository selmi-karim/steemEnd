const steem = require('steem')

/**
 * Get User profil.
 * @returns {User[]}
 */
function getUserProfil(req, res) {
  const { username } = req.params
  console.log('username: ' + username)

  steem.api.getAccounts([username], function (err, result) {
    //console.log(err, result);
    //res.send(JSON.parse(result[0].json_metadata))
    res.send(result)
  });  
}


/**
 * Get user image profil.
 * @returns {URL}
 */
function getImgProfil(req, res) {
  const { username } = req.params
  console.log('username: ' + username)
  steem.api.getAccounts([username], function (err, result) {
    // extract user data
    console.log('data :' + result[0].json_metadata)
    res.setHeader('Content-Type', 'application/json');
    res.send({ image: JSON.parse(result[0].json_metadata).profile.profile_image })
  });
}


/**
 * Get Latest posts of specific user.
 * @returns {Posts[]}
 */
function unfollowUser(req, res) {
  const { username } = req.params

  const query = {
    tag: username, // This tag is used to filter the results by a specific post tag
    limit: size, // This limit allows us to limit the overall results returned to 5
  };
  steem.api.getDiscussionsByBlog(query, function (err, result) {
    var newObject = []
    result.forEach(element => {
      element.body = getImgUrl(element.body)
      newObject.push(element)
    });
    res.send(newObject)
  });
}


/**
 * Get Latest posts of specific user.
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function followUser(req, res) {
  const { username } = req.params

  const query = {
    tag: username, // This tag is used to filter the results by a specific post tag
    limit: size, // This limit allows us to limit the overall results returned to 5
  };
  steem.api.getDiscussionsByBlog(query, function (err, result) {
    var newObject = []
    result.forEach(element => {
      element.body = getImgUrl(element.body)
      newObject.push(element)
    });
    res.send(newObject)
  });
}


/**
 * Get followers of specific user.
 * @property {number} req.query.size - number of followers.
 * @returns {Users[]}
 */
function getFollowCount(req, res) {
  const { username } = req.params
  steem.api.getFollowCountAsync(username,function(err, result) {
    res.send(result)
  });
}


module.exports = { getUserProfil, getImgProfil, followUser, unfollowUser, getFollowCount };
