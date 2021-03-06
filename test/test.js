var assert = require('./assert');
var Path = require('..');

test("Path()", function () {
	assert.equal(new Path('a'), 'a');
	assert.equal(new Path('a/'), 'a/');
	assert.equal(new Path('a//'), 'a/');
	assert.equal(new Path('/a'), '/a');
	assert.equal(new Path('//a'), '/a');
	assert.equal(new Path('/a/'), '/a/');
	assert.equal(new Path('/a//'), '/a/');
	assert.equal(new Path('//a/'), '/a/');
	assert.equal(new Path('//a//'), '/a/');
	assert.equal(new Path('a/b'), 'a/b');
	assert.equal(new Path('a//b'), 'a/b');
	assert.equal(new Path(''), '.');
	assert.equal(new Path('/'), '/');
	assert.equal(new Path('//'), '/');
	assert.equal(new Path('.'), '.');
	assert.equal(new Path('./'), './');
	assert.equal(new Path('.//'), './');
	assert.equal(new Path('..'), '..');
	assert.equal(new Path('../'), '../');
	assert.equal(new Path('..//'), '../');
	assert.equal(new Path('./a'), 'a');
	assert.equal(new Path('.//a'), 'a');
	assert.equal(new Path('../a'), '../a');
	assert.equal(new Path('..//a'), '../a');
	assert.equal(new Path('a/.'), 'a');
	assert.equal(new Path('a/./'), 'a/');
	assert.equal(new Path('a/..'), '.');
	assert.equal(new Path('a/../'), './');
	assert.equal(new Path('./fixtures///b/../b/c.js'), 'fixtures/b/c.js');
	assert.equal(new Path('/foo/../../../bar'), '/bar');
	assert.equal(new Path('a//b//../b'), 'a/b');
	assert.equal(new Path('a//b//./c'), 'a/b/c');
	assert.equal(new Path('a//b//.'), 'a/b');
});

test("dirname()", function () {
	assert.equal(new Path('a').dirname(), '.');
	assert.equal(new Path('a/').dirname(), '.');
	assert.equal(new Path('/a').dirname(), '/');
	assert.equal(new Path('/a/').dirname(), '/');
	assert.equal(new Path('a/b').dirname(), 'a');
	assert.equal(new Path('a/b/').dirname(), 'a');
	assert.equal(new Path('/a/b').dirname(), '/a');
	assert.equal(new Path('/a/b/').dirname(), '/a');
	assert.equal(new Path('').dirname(), '.');
	assert.equal(new Path('/').dirname(), '/');
	assert.equal(new Path('.').dirname(), '.');
	assert.equal(new Path('./').dirname(), '.');
	assert.equal(new Path('..').dirname(), '.');
	assert.equal(new Path('../').dirname(), '.');
});

test("dirname() returns a new object", function () {
	var path = new Path('a/b');
	path.dirname();

	assert.equal(path, 'a/b');
});

test("basename()", function () {
	assert.equal(new Path('a').basename(), 'a');
	assert.equal(new Path('a/').basename(), 'a');
	assert.equal(new Path('/a').basename(), 'a');
	assert.equal(new Path('/a/').basename(), 'a');
	assert.equal(new Path('a/b').basename(), 'b');
	assert.equal(new Path('a/b/').basename(), 'b');
	assert.equal(new Path('/a/b').basename(), 'b');
	assert.equal(new Path('/a/b/').basename(), 'b');
	assert.equal(new Path('').basename(), '');
	assert.equal(new Path('/').basename(), '');
	assert.equal(new Path('.').basename(), '.');
	assert.equal(new Path('./').basename(), '.');
	assert.equal(new Path('..').basename(), '..');
	assert.equal(new Path('../').basename(), '..');
});

test("extname()", function () {
	assert.equal(new Path('').extname(), '');
	assert.equal(new Path('/path/to/file').extname(), '');
	assert.equal(new Path('/path/to/file.ext').extname(), '.ext');
	assert.equal(new Path('/path.to/file.ext').extname(), '.ext');
	assert.equal(new Path('/path.to/file').extname(), '');
	assert.equal(new Path('/path.to/.file').extname(), '');
	assert.equal(new Path('/path.to/.file.ext').extname(), '.ext');
	assert.equal(new Path('/path/to/f.ext').extname(), '.ext');
	assert.equal(new Path('/path/to/..ext').extname(), '.ext');
	assert.equal(new Path('file').extname(), '');
	assert.equal(new Path('file.ext').extname(), '.ext');
	assert.equal(new Path('.file').extname(), '');
	assert.equal(new Path('.file.ext').extname(), '.ext');
	assert.equal(new Path('/file').extname(), '');
	assert.equal(new Path('/file.ext').extname(), '.ext');
	assert.equal(new Path('/.file').extname(), '');
	assert.equal(new Path('/.file.ext').extname(), '.ext');
	assert.equal(new Path('.path/file.ext').extname(), '.ext');
	assert.equal(new Path('file.ext.ext').extname(), '.ext');
	assert.equal(new Path('file.').extname(), '.');
	assert.equal(new Path('.').extname(), '');
	assert.equal(new Path('./').extname(), '');
	assert.equal(new Path('.file.ext').extname(), '.ext');
	assert.equal(new Path('.file').extname(), '');
	assert.equal(new Path('.file.').extname(), '.');
	assert.equal(new Path('.file..').extname(), '.');
	assert.equal(new Path('..').extname(), '');
	assert.equal(new Path('../').extname(), '');
	assert.equal(new Path('..file.ext').extname(), '.ext');
	assert.equal(new Path('..file').extname(), '.file');
	assert.equal(new Path('..file.').extname(), '.');
	assert.equal(new Path('..file..').extname(), '.');
	assert.equal(new Path('...').extname(), '.');
	assert.equal(new Path('...ext').extname(), '.ext');
	assert.equal(new Path('....').extname(), '.');
	assert.equal(new Path('file.ext/').extname(), '.ext');
	assert.equal(new Path('file.ext//').extname(), '.ext');
	assert.equal(new Path('file/').extname(), '');
	assert.equal(new Path('file//').extname(), '');
	assert.equal(new Path('file./').extname(), '.');
	assert.equal(new Path('file.//').extname(), '.');
});

test("extname(ext)", function () {
	assert.equal(new Path('a').extname('.b'), 'a.b');
	assert.equal(new Path('a/').extname('.b'), 'a.b/');
	assert.equal(new Path('a.').extname('.b'), 'a.b');
	assert.equal(new Path('a./').extname('.b'), 'a.b/');
	assert.equal(new Path('a..').extname('.b'), 'a..b');
	assert.equal(new Path('a../').extname('.b'), 'a..b/');
	assert.equal(new Path('a.b').extname('.c'), 'a.c');
	assert.equal(new Path('a.b/').extname('.c'), 'a.c/');
	assert.equal(new Path('a.b.').extname('.c'), 'a.b.c');
	assert.equal(new Path('a.b./').extname('.c'), 'a.b.c/');
	assert.equal(new Path('a.b.c').extname('.d'), 'a.b.d');
	assert.equal(new Path('a.b.c/').extname('.d'), 'a.b.d/');
	assert.equal(new Path('.a').extname('.b'), '.a.b');
	assert.equal(new Path('.a/').extname('.b'), '.a.b/');
	assert.equal(new Path('..a').extname('.b'), '..b');
	assert.equal(new Path('..a/').extname('.b'), '..b/');
	assert.equal(new Path('.a.b').extname('.c'), '.a.c');
	assert.equal(new Path('.a.b/').extname('.c'), '.a.c/');
	assert.equal(new Path('.a.b.').extname('.c'), '.a.b.c');
	assert.equal(new Path('.a.b./').extname('.c'), '.a.b.c/');
	assert.equal(new Path('.a.b.c').extname('.d'), '.a.b.d');
	assert.equal(new Path('.a.b.c/').extname('.d'), '.a.b.d/');
	assert.equal(new Path('a.b/c').extname('.d'), 'a.b/c.d');
	assert.equal(new Path('.a/.b').extname('.c'), '.a/.b.c');
	assert.equal(new Path('').extname('.a'), '.');
	assert.equal(new Path('/').extname('.a'), '/');
	assert.equal(new Path('.').extname('.a'), '.');
	assert.equal(new Path('./').extname('.a'), './');
	assert.equal(new Path('..').extname('.a'), '..');
	assert.equal(new Path('../').extname('.a'), '../');
});

test("extname(ext) returns a new object", function () {
	var path = new Path('a');
	path.extname('.b');

	assert.equal(path, 'a');
});

test("join()", function () {
	assert.equal(new Path('.').join('x/b', '..', '/b/c.js'), 'x/b/c.js');
	assert.equal(new Path('/.').join('x/b', '..', '/b/c.js'), '/x/b/c.js');
	assert.equal(new Path('/foo').join('../../../bar'), '/bar');
	assert.equal(new Path('foo').join('../../../bar'), '../../bar');
	assert.equal(new Path('foo/').join('../../../bar'), '../../bar');
	assert.equal(new Path('foo/x').join('../../../bar'), '../bar');
	assert.equal(new Path('foo/x').join('./bar'), 'foo/x/bar');
	assert.equal(new Path('foo/x/').join('./bar'), 'foo/x/bar');
	assert.equal(new Path('foo/x/').join('.', 'bar'), 'foo/x/bar');
	assert.equal(new Path('.').join('./'), './');
	assert.equal(new Path('.').join('.', '.'), '.');
	assert.equal(new Path('.').join('./', '.'), '.');
	assert.equal(new Path('.').join('/./', '.'), '.');
	assert.equal(new Path('.').join('/////./', '.'), '.');
	assert.equal(new Path('').join('.'), '.');
	assert.equal(new Path('').join('foo'), 'foo');
	assert.equal(new Path('foo').join('/bar'), 'foo/bar');
	assert.equal(new Path('').join('/foo'), '/foo');
	assert.equal(new Path('').join('', '/foo'), '/foo');
	assert.equal(new Path('').join('', 'foo'), 'foo');
	assert.equal(new Path('foo').join(''), 'foo');
	assert.equal(new Path('foo/').join(''), 'foo/');
	assert.equal(new Path('foo').join('', '/bar'), 'foo/bar');
	assert.equal(new Path('./').join('..', '/foo'), '../foo');
	assert.equal(new Path('./').join('..', '..', '/foo'), '../../foo');
	assert.equal(new Path('.').join('..', '..', '/foo'), '../../foo');
	assert.equal(new Path('').join('..', '..', '/foo'), '../../foo');
	assert.equal(new Path('/').join('.'), '/');
	assert.equal(new Path('/').join('..'), '/');
	assert.equal(new Path('/').join('..', '..'), '/');
	assert.equal(new Path('').join(''), '.');
	assert.equal(new Path(' ').join('foo'), ' /foo');
	assert.equal(new Path(' ').join('.'), ' ');
	assert.equal(new Path(' ').join('/'), ' /');
	assert.equal(new Path(' ').join(''), ' ');
	assert.equal(new Path('/').join('foo'), '/foo');
	assert.equal(new Path('/').join('/foo'), '/foo');
	assert.equal(new Path('/').join('//foo'), '/foo');
	assert.equal(new Path('/').join('', '/foo'), '/foo');
	assert.equal(new Path('').join('/', 'foo'), '/foo');
	assert.equal(new Path('').join('/', '/foo'), '/foo');
});

test("join() returns a new object", function () {
	var path = new Path('a');
	path.join('b');

	assert.equal(path, 'a');
});

test("resolve()", function () {
	assert.equal(new Path('/var/lib').resolve('../', 'file/'), '/var/file');
	assert.equal(new Path('/var/lib').resolve('/../', 'file/'), '/file');
	assert.equal(new Path('a/b/c/').resolve('../../..'), '.');
	assert.equal(new Path('/some/dir').resolve('.', '/absolute/'), '/absolute');
});

test("resolve() returns a new object", function () {
	var path = new Path('a');
	path.resolve('b');

	assert.equal(path, 'a');
});

test("toString() doesn't modify the original object", function () {
	var path = new Path('a/..');
	path.toString();

	assert.equal(path.basename(), '..');
});

test("endsWithSlash", function () {
	assert.ok(new Path('a/').endsWithSlash());
	assert.ok(!new Path('a').endsWithSlash());
});