const { clearHash } = require('../services/cachingHelper');

module.exports = async (req, res, next) => {
  await next();

  clearHash(req.user.id);
};
