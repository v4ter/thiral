var elements = $('.main img');

function update(){
	elements.each(function(){
		var self = $(this);

		if(aboveTheFold(self)){

		} else if(belowTheFold(self)){
			self.trigger('appear');
		}
	});
}

elements.each(function(){
	var self = this,
		$self = $(self);

	self.loaded = false;

	$self.on('appear', function(){
		if(!this.loaded){
			$('<img>').load(function(){
				$self
					.hide()
					.attr('src', $self.attr('data-original'))
					.fadeIn(400);
				self.loaded = true;

				var temp = $.grep(elements, function(element){
					return !element.loaded;
				});
				elements = $(temp);

			});
		}
	});
});

$(window).on('scroll', function(){
	return update();
});



function aboveTheFold(el){
	var fold = $(window).scrollTop();

	return fold >= el.offset().top + el.height();
}

function belowTheFold(el){
	var fold = $(window).height() + $(window).scrollTop();

	return fold <= el.offset().top;
}