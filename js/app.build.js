({
	'appDir' : '../',
	'baseUrl' : 'js',
	'dir' : '../../thiral-build',
	paths: {
		'jquery' : 'vendor/jquery',
		'underscore' : 'vendor/underscore',
		'lazyload' : 'vendor/jquery.lazyload',
		'specialscroll' : 'vendor/jquery.specialscroll',
		'scrollTo' : 'vendor/jquery.scrollTo-1.4.2-min',
		'templates' : '../templates/'
	},
	'modules' : [
		{
			'name' : 'main'
		}
	],
	fileExclusionRegExp: /^\.|\.md\b|\.bat\b/,
	removeCombined : true
})