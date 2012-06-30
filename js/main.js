requirejs.config({
	paths: {
		'jquery' : 'vendor/jquery',
		'underscore' : 'vendor/underscore',
		'lazyload' : 'vendor/jquery.lazyload',
		'specialscroll' : 'vendor/jquery.specialscroll',
		'scrollTo' : 'vendor/jquery.scrollTo-1.4.2-min',
		'templates' : 'templates'
	},

	shim : {
		'underscore' : {exports : '_'},
		'lazyload' : ['jquery'],
		'specialscroll' : ['jquery'],
		'scrollTo' : ['jquery']
	}
});

requirejs(['underscore', 'thiral.lazyload']);