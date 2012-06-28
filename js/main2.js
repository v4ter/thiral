function update(){

}

$(section).on('appear', function(){

});

$(window).on('scroll', function(){
	return update();
});

function aboveTheFold(el){
	var fold = $(window).scrollTop();

	return fold >= el.offset().top + el.height();
}

function belowTheFold(){

}