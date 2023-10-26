const config = {
	entries: ['./src/components/*.js', './src/components/*/index.js'],
	cwd: './src',
	// introduce multiple extension as extensions: [.js, '.jsx']
	ignore: [
		'**/*.test.js',
		'**/*.spec.js',
		'**/setupTests.js',
	],
};

module.exports = config;
