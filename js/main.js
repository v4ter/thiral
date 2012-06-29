$(function(){
	$.ajax({
		url : 'products.json',
		success : function(data){
			app(data);
		}
	});
	
	function app(data){
		var navLinkTemplate = _.template($('#nav-link').html()),
			gallerySectionTemplate = _.template($('#gallery-section').html()),
			galleryItemTemplate = _.template($('#gallery-item').html()),
			navDom = $('.nav ul'),
			mainDom = $('.main');
			obj = data,
			curSectionGallery = '',
			stickyTop = '',
			elements = '';

		function templating(obj){
			_.each(obj, function(properties, seriesId){
				navDom.append(navLinkTemplate({
					'title' : properties.title,
					'id' : seriesId
				}));

				mainDom.append(gallerySectionTemplate({
					'title' : properties.title,
					'id' : seriesId
				}));

				curSectionGallery = mainDom.children('.gallery-section').last().children('.gallery');

				_.each(obj[seriesId]['products'], function(product){
					curSectionGallery.append(galleryItemTemplate({
						'thumbSrc' : product.thumbSrc,
						'thumbWidth' : product.thumbWidth,
						'thumbHeight' : product.thumbHeight
					}));
				});

			});
		}

		$(window).on('scroll', function(){
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
			$('nav a').on('click', function(e){
				e.preventDefault();

				var id = $(this).attr('href'),
					sectionDom = $(id);

				$('body').scrollTo(sectionDom, 500);
			});
		}

		(function init(){
			templating(obj);
			stickyTop = $('.sticky').offset().top;
			$('img').lazyload({
				'event' : 'scrollstop'
			});
			bindNavlinks();
			$(window).scrollTo(0);
		}());

		
	}
});
