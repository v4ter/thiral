$(function(){
	$(window).scrollTop(0);
	var mode = 'scrolling';
	$('.active').next().addClass('next');

	$('a').on('click', function(e){
		e.preventDefault();
		mode = 'anchoring';

		var id = $(this).attr('href');
		$('.nav a').removeClass('active');
		$('nav a[href=' + id + ']').addClass('active visited');

		var section = $(this).attr('href');

		if(!$(section).hasClass('open')){
			var curIndex = $('.gallery-section').index($('.active')),
				newIndex = $('.gallery-section').index($(section));

			if(curIndex < newIndex){
				$(section).children('.gallery').fadeIn(100, function(){
					$('body').scrollTo(section, 500, {
						onAfter : function(){
							$('.gallery-section').removeClass('active');
							$(section).addClass('active').next().addClass('next');
							mode = 'scrolling';
						}
					});
				});
			} else {
				$('body').scrollTo(section, 500, {
					onAfter : function(){
						$(section).children('.gallery').fadeIn(800, function(){
							$('.gallery-section').removeClass('active');
							$(section).addClass('active open').next().addClass('next');
							mode = 'scrolling';
						});
					}
				});
			}
		} else {
			$('body').scrollTo(section, 500, {
				onAfter : function(){
					$('.gallery-section').removeClass('active');
					$(section).addClass('active').next().addClass('next');
					mode = 'scrolling';
				}
			});
		}
		
	});

	$(window).on('scroll', function(){
		if(mode === 'scrolling' && $('.active').next().length !== 0){
			var winOffset = $(this).scrollTop(),
				nextOffset = $('.active').next().offset().top - $(window).height() + 100;

			if(winOffset > nextOffset){
				var section = $('.active').next(),
					id = '#' + section.attr('id');

				$(section).fadeIn(300, function(){
					$(this).children('.gallery').fadeIn(800);
					$('.gallery-section').removeClass('active');
					$(section).addClass('active open').next().addClass('next');

					$('.nav a').removeClass('active');
					$('.nav a[href=' + id + ']').addClass('active visited');
				});

			}
		}
	});

	//sticky sidebar
	var stickyTop = $('.sticky').offset().top; // returns number
 
	$(window).scroll(function(){ // scroll event
		var windowTop = $(window).scrollTop(); // returns number

		if (stickyTop < windowTop) {
			$('.sticky').css({ position: 'fixed', top: 10 });
		}
		else {
			$('.sticky').css('position', 'static');
		}

	});
});
