const crypto = require('crypto');

module.exports = function getURLHash(url) {
	return crypto
    .createHash('sha1')
    .update(url)
    .digest('hex')
    .substring(0, 16);
}