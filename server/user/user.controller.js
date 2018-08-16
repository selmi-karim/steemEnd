const steem = require('steem')



/**
 * private function to extract img from text
 */
function getImgUrl(text) {
  const regex = /(https?:\/\/steepshot.org\/api\/[^\s]+)/g;
  return text.replace(')', ' ').match(regex)
}


/**
 * Get User profil.
 * @returns {User[]}
 */
function getUserProfil(req, res) {
  const { username } = req.params
  console.log('username: ' + username)

  steem.api.getAccounts([username], function (err, result) {
    //console.log(err, result);
    const metadata = Object.values(JSON.parse(result[0].json_metadata))[0]
    metadata['post_count'] = result[0].post_count
    metadata['can_vote'] = result[0].can_vote
    metadata['voting_power'] = result[0].voting_power
    res.send(metadata)
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
  steem.api.getFollowCountAsync(username, function (err, result) {
    res.send(result)
  });
}

/**
 * Get User Articles.
 * @property {number} req.query.size - number of followers.
 * @returns {Article[]}
 */
function getUserPosts(req, res) {
  const { size = 10 } = req.query  // by default 10 posts
  const { username } = req.params
  
  steem.api.getDiscussionsByAuthorBeforeDate(username,null,'2100-01-01T00:00:00', size, function (err, result) {
    var newObject = []
    result.forEach(element => {
      console.log('-------------')
      element.body = getImgUrl(element.body)
      if (element.body !== null)
        newObject.push(element)
    });
    res.send(newObject)
  });
}

module.exports = { getUserProfil, getImgProfil, followUser, unfollowUser, getFollowCount, getUserPosts };
