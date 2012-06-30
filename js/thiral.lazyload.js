define([
	'jquery',
	'text!templates/nav_li.html',
	'text!templates/gallery_section.html',
	'text!templates/gallery_item.html',
	'lazyload',
	'specialscroll',
	'scrollTo'
], function($, navLi, gallerySection, galleryItem){
	$.fn.thiralLazyLoad = function(options){
		var wrapperDom = this,
			navDom = options.nav || $('nav').first(),
			data = options.data,
			jsonObj = options.jsonObj,
			navLinkTemplate = _.template(navLi),
			gallerySectionTemplate = _.template(gallerySection),
			galleryItemTemplate = _.template(galleryItem),
			stickyTop = 0,
			mode = 'scrolling',
			measures = {};

		function templating(obj){
			_.each(obj, function(properties, seriesId){
				navDom.append(navLinkTemplate({
					'title' : properties.title,
					'id' : seriesId,
					'navThumb' : properties.navSrc
				}));

				wrapperDom.append(gallerySectionTemplate({
					'title' : properties.title,
					'id' : seriesId
				}));

				var curSectionGallery = wrapperDom.children('.gallery-section').last().children('.gallery');

				_.each(obj[seriesId]['products'], function(product){
					curSectionGallery.append(galleryItemTemplate({
						'thumbSrc' : product.thumbSrc,
						'largeSrc' : product.largeSrc,
						'desc' : product.desc,
						'thumbWidth' : product.thumbWidth,
						'thumbHeight' : product.thumbHeight
					}));
				});

			});
		}

		function getSectionsMeasures(){
			$('.gallery-section').each(function(){
				var self = $(this);

				measures[self.attr('id')] = {
					top: self.offset().top,
					bottom: self.offset().top + self.height()
				};
			});
		}

		function checkCurSection(cur){
			cur = cur + $(window).height() / 2;

			_.each(measures, function(properties, section){
				if(cur > properties.top && cur < properties.bottom){
					navDom.find('a').removeClass('active');
					navDom.find('a[href=#' + section +']').addClass('active visited');
				}
			});
		}

		$(window).on('scroll', function(){
			if(mode === 'scrolling') checkCurSection($(this).scrollTop());

			//sticky sidebar
			var windowTop = $(this).scrollTop();

			if (stickyTop < windowTop) {
				$('.sticky').css({ position: 'fixed', top: 10 });
			}
			else {
				$('.sticky').css('position', 'static');
			}
		});

		function bindNavlinks(){
			navDom.on('click', 'a', function(e){
				e.preventDefault();

				var self = $(this),
					id = self.attr('href'),
					sectionDom = $(id);

				mode = 'navigating';

				$('body').scrollTo(sectionDom, 500, {
					onAfter : function(){
						navDom.find('a').removeClass('active');
						self.addClass('active visited');
						mode = 'scrolling';
					}
				});
				
			});
		}

		(function init(){
			templating(data);
			stickyTop = $('.sticky').offset().top;
			$('img').lazyload({
				'event' : 'scrollstop',
				'effect' : 'fadeIn',
				'effect_speed' : 250
			});
			bindNavlinks();
			navDom.find('a').first().addClass('active visited');
			getSectionsMeasures();
			$(window).scrollTo(0);
		}());
	};
});

