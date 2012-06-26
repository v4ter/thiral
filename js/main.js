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
			obj = data;

		templating(obj);

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
			});
		}

		function loadImages(sectionDom, callback){
			var	id = sectionDom.attr('id'),
				gallery = sectionDom.children('.gallery');

			_.each(obj[id]['products'], function(product){
				gallery.append(galleryItemTemplate({
					'srcThumb' : product.srcThumb
				}));
			});

			if(callback) callback();
		}
			

		//on click
		$('a').on('click', function(e){
			e.preventDefault();
			mode = 'anchoring';

			var id = $(this).attr('href'),
				sectionDom = $(id);
			$('.nav a').removeClass('active');
			$('nav a[href=' + id + ']').addClass('active visited');

			if(!sectionDom.hasClass('open')){
				var curIndex = $('.gallery-section').index($('.active')),
					newIndex = $('.gallery-section').index(sectionDom);

				if(curIndex < newIndex){
					for(var i = curIndex; i <= newIndex; i++){
						$('.gallery-section').eq(i).addClass('title');
					}

					var callback = function(){
						sectionDom.children('.gallery').fadeIn(250, function(){
							$('body').scrollTo(id, 500, {
								onAfter : function(){
									

									
										$('.gallery-section').removeClass('active');
										sectionDom.addClass('open active').next().addClass('title');
										mode = 'scrolling';
								}
							});
						});
					};

					loadImages(sectionDom, callback);
				} else {
					$('body').scrollTo(id, 500, {
						onAfter : function(){
							loadImages(sectionDom, callback);

							function callback(){
								sectionDom.children('.gallery').fadeIn(800, function(){
									sectionDom.addClass('open').next().addClass('title');
									mode = 'scrolling';
								});
							}
						}
					});
				}
			} else {
				$('body').scrollTo(id, 500, {
					onAfter : function(){
						$('.gallery-section').removeClass('active');
						sectionDom.addClass('active').next().addClass('title');
						mode = 'scrolling';
					}
				});
			}
			
		});
		
		//on scroll
		$(window).on('scroll', function(){
			var windowTop = $(this).scrollTop();

			if(mode === 'scrolling' && $('.active').next().length !== 0){
				var	nextOffset = $('.active').next().offset().top - $(window).height() + 80;

				if(windowTop > nextOffset){
					var sectionDom = $('.active').next(),
						id = '#' + sectionDom.attr('id');

					var callback = function(){
						$('.gallery-section').removeClass('active');
						sectionDom.addClass('active open').next().addClass('title');

						$('.nav a').removeClass('active');
						$('.nav a[href=' + id + ']').addClass('active visited');
					};

					if(!$('.active').next().hasClass('open')){
						sectionDom.children('.gallery').fadeIn(800, function(){
							loadImages(sectionDom, callback);
						});
					} else {
						callback();
					}
				}
			}

			//sticky sidebar
			if (stickyTop < windowTop) {
				$('.sticky').css({ position: 'fixed', top: 10 });
			}
			else {
				$('.sticky').css('position', 'static');
			}
		});

		//initial.setup
		$('.nav a').first().addClass('active visited');
		$('.gallery-section').first().addClass('active open');
		$('.gallery-section.active').next().addClass('title open');

		var totalHeight = 0;
		
		loadImages($('.gallery-section.active'));

		loadImages($('.gallery-section.open').last());


		// function checkHeight(h){
		// 	if(h < $(window).height()){
		// 		var nextGallery = $('.gallery-section').not('.open').first();

		// 		console.log(nextGallery);

		// 		nextGallery.addClass('open');

		// 		loadImages(nextGallery, function(){
		// 			console.log(totalHeight);
		// 			totalHeight += $('.gallery-section.open').last().height();
		// 			checkHeight(totalHeight);
		// 		});
				
		// 	}
		// }

		

		var	stickyTop = $('.sticky').offset().top, mode;
		$(window).scrollTo(0, 0, {
			onAfter : function(){
				mode = 'scrolling';
			}
		});
	}
});
