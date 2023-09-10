module.exports = {
	globPatterns: [
		'**/*.{html,png,jpg,jpeg,svg,css,xml,js,json,webmanifest}'
	],
	
	// Don't change that unless you know what you're doing
	globDirectory: 'public/',
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
	]
};