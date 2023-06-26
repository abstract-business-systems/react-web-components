const config = {
	entry: './src/stories/common/*.js',
	cwd: './src',
	// introduce multiple extension as extensions: [.js, '.jsx']
	ignore: [
		'**/*.test.js',
		'**/*.spec.js',
		'**/setupTests.js',
	],
};

module.exports = config;
