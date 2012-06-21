var itemsCount = parseInt($('.container').attr('data-items'), 10),
	photosCount = parseInt($('.container').attr('data-photos'), 10),
	navLink = _.template($('#nav-link').html()),
	gallerySection = _.template($('#gallery-section').html()),
	galleryItem = _.template($('#gallery-item').html()),
	navDom = $('.nav ul'),
	mainDom = $('.main');

for(var i = 0; i < itemsCount; i++){
	var active = i === 0 ? true : false;

	navDom.append(navLink({'i' : i, 'active' : active}));
	mainDom.append(gallerySection({'i' : i, 'active' : active}));

	for(var j = 0; j < photosCount; j++){
		$('.gallery-section > .gallery').eq(i).append(galleryItem({}));
	}
}

