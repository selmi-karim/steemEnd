

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
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}


module.exports = { get };
