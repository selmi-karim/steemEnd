const steem = require('steem')

/**
 * Get Latest posts of specific user.
 * @property {number} req.query.size - Number of posts.
 * @returns {Posts[]}
 */
function getUserProfil(req, res) {
  const { username } = req.params
  console.log('username: ' + username)

  steem.api.getAccounts([username], function (err, result) {
    //console.log(err, result);
    res.send(JSON.parse(result[0].json_metadata))
  });
}


/**
 * Get user profil photo.
 * @returns {URL}
 */
function getImgProfil(req, res) {
  const { username } = req.params
  console.log('username: ' + username)

  steem.api.getAccounts([username], function (err, result) {
    // extract user data
    res.send(JSON.parse(result[0].json_metadata).profile.profile_image)
  });
}


/**
 * Get Latest posts of specific user.
 * @property {number} req.query.size - Number of posts.
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




module.exports = { getUserProfil, getImgProfil, followUser, unfollowUser };
