module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{html,png,jpg,jpeg,svg,css,xml,js,json,webmanifest}'
	],
	
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
	]
};