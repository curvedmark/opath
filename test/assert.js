var _assert = require('assert');
var assert = Object.create(_assert);

module.exports = assert;

assert.equal = function (path, str) {
	_assert.equal(path.toString(), str);
};