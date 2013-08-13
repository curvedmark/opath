var assert = require('assert');

exports.equal = function (path, str) {
	assert.equal(path.toString(), str);
};