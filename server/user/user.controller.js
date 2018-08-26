const steem = require('steem')



/**
 * private function to extract img from text
 */
function getImgUrl(text) {
  //const regex = /(https?:\/\/steepshot.org\/api\/[^\s]+)/g;
  const regex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
  return text.replace(')', ' ').match(regex)
}


/**
 * Get User profil.
 * @returns {User[]}
 */
function getUserProfil(req, res) {
  const { username } = req.params
  steem.api.getAccounts([username], function (err, result) {
    console.log(err, result)
    let metadata = {"about": "","location": "","profile_image": "","cover_image": ""}
    if (result[0].json_metadata != '{}' && result[0].json_metadata != '')
      metadata = Object.values(JSON.parse(result[0].json_metadata))[0]
    metadata['post_count'] = result[0].post_count
    metadata['can_vote'] = result[0].can_vote
    metadata['voting_power'] = result[0].voting_power
    res.send(metadata)
    //res.send({ok:'k'})
  });
}


/**
 * Get user image profil.
 * @returns {URL}
 */
function getImgProfile(req, res) {
  const { username } = req.params
  res.send({ image: 'https://steemitimages.com/u/' + username + '/avatar' })
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

  steem.api.getDiscussionsByAuthorBeforeDate(username, null, '2100-01-01T00:00:00', size, function (err, result) {
    var filter = []
    result.forEach(element => {
      console.log(element.body)
      console.log('------------\n')
      element.body = getImgUrl(element.body)
      console.log(element.body)
      console.log('**********\n')
      var newData = {};
      newData['title'] = element.title
      if (element.body !== null)
        newData['source'] = { 'uri': element.body[0] }
      newData['id'] = element.id

      newData['category'] = element.category
      newData['net_votes'] = element.net_votes
      newData['pending_payout_value'] = element.pending_payout_value
      if (element.body !== null)
        filter.push(newData)
    });
    res.send(filter)
  });
}

module.exports = { getUserProfil, getImgProfile, followUser, unfollowUser, getFollowCount, getUserPosts };
