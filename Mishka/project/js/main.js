jQuery(document).ready(function($) {
	/*variables*/
	var sliderItemHeight = $('.reviews__item').height(); //calculate height of slider__item element
	var sliderList = $('.reviews__list'); // just reviews__list element 
	var reviewsCount = $('.reviews__item').length; // calculate reviews__item quantity
	var reviewNow = 1; // just need for reviews slider
	var mainNav = $('.main-nav'); //needed for main-nav toogler on mobile
	try {var abuTop = $(".about-us").offset().top;} catch(e) {}
	var windowWidth = $(window).width();
	var overlay = $('.overlay');

	/*Binders*/
	$(window).bind('scroll', loadMap);
	mainNav.removeClass('main-nav--nojs');
	sliderList.height(sliderItemHeight);

	/*event listeners*/
	$('.menu-dropdown').click(mobileMenuDropdown);

	$('.user-list__item--search-mock').on('click', function() {
		overlay.toggleClass('overlay--active');
		$('.search-modal').toggleClass('modal--active');
	});

	$('.slider__button--next').on('click', nextSlide);

	$('.slider__button--prev').on('click', prevSlide);

	overlay.on('click', closeModal);

	$('.modal__close-btn').on('click', closeModal);

	$('.button-add-to-card').on('click', function() {
		overlay.toggleClass('overlay--active');
		$('.modal-add-to-card').toggleClass('modal--active');
	});

	$('.video-play').on('click', function() {
		var btnData = $(this).data("video");
		$('.modal-video').filter(function(){ return $(this).data("video") == btnData}).toggleClass('modal--active');
		overlay.toggleClass('overlay--active');
		$('.modal--active .video').attr('controls', 'controls');
	});

	//backlight icons on focus and blur
	$('.input-tel').on('focus', function() {
		$('.order-form__phone-icon').attr({
			'fill': '#62d1ba',
			'fill-opacity': '1'
		});
	});
	$('.input-tel').on('blur', function() {
		$('.order-form__phone-icon').attr({
			'fill': '#000000',
			'fill-opacity': '0.2'
		});
	});
	$('.input-email').on('focus', function() {
		$('.order-form__email-icon').attr({
			'fill': '#62d1ba',
			'fill-opacity': '1'
		});
	});
	$('.input-email').on('blur', function() {
		$('.order-form__email-icon').attr({
			'fill': '#000000',
			'fill-opacity': '0.2'
		});
	});

	$('.input-quantity').keyup(summProducts);
	$('.input-quantity').keyup(summProduct);

	$('.submit-close-modal').click(closeModal);

	/*functions*/
	function mobileMenuDropdown(){
		$(this).toggleClass('menu-dropdown--active');

		if (mainNav.hasClass('main-nav--closed')){
			mainNav.removeClass('main-nav--closed').addClass('main-nav--opened');
		}else{
		  	mainNav.removeClass('main-nav--opened').addClass('main-nav--closed');
		}
	}

	function loadMap(){
		var windowTop = $(this).scrollTop();
		if (windowTop > abuTop) {
			$('.contacts__map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d999.297703100568!2d30.322793929901227!3d59.93885554297068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696310fca145cc1%3A0x42b32648d8238007!2sBolshaya+Konyushennaya+Street%2C+19%2F8%2C+Sankt-Peterburg%2C+191186!5e0!3m2!1sen!2sru!4v1555322722002!5m2!1sen!2sru" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>');
			$(window).unbind('scroll');
		}
	}

	function nextSlide(){
		if (reviewNow == reviewsCount || reviewNow<=0 || reviewNow>reviewsCount) {
			sliderList.animate({top: '0'}, 300);
			reviewNow=1;
		} else{
			var translateHeight = -sliderItemHeight*(reviewNow);
			sliderList.animate({top: ''+translateHeight+''}, 300);
			reviewNow++;
		}
	}
	function prevSlide(){
		if (reviewNow == 1 || reviewNow<=0 || reviewNow>reviewsCount) {
			var translateHeight = -sliderItemHeight*(reviewsCount-1);
			sliderList.animate({top: ''+translateHeight+''}, 300);
			reviewNow = reviewsCount;
		} else{
			var translateHeight = -sliderItemHeight*(reviewNow-2);
			sliderList.animate({top: ''+translateHeight+''}, 300);
			reviewNow--;
		}
	}

	function summProduct(){
		var cost = $(this).data('cost');
		$(this).siblings('.item-cost').html(($(this).val() * cost));	
	}
	function summProducts(){
		var sum = 0;
		$(".input-quantity").each(function() {
			var price = $(this).data("cost")
			if (this.value.length && !isNaN(this.value) && !isNaN(price)){
				sum += parseFloat(this.value) * parseFloat(price);
			}//add only if the value and price is a number
		});//iterate through each textboxes and add the values
		$(".basket__products-summ").html(sum.toFixed(2));//.toFixed() method will roundoff the final sum to 2 decimal places
	}
	function closeModal(){
		overlay.toggleClass('overlay--active');
		$('.modal--active').toggleClass('modal--active');
		try {
			$('video').trigger('pause');
		} catch(e) {}
	}

	$(".order-form").submit(function(e) { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "core/mail.php", //Change
			data: th.serialize()
		}).done(function() {
			overlay.toggleClass('overlay--active');
	  		$('.success-modal').toggleClass('modal--active');
			setTimeout(function() {
				th.trigger("reset");
			}, 1000);
		}).fail(function() {
	 		overlay.toggleClass('overlay--active');
	  		$('.error-modal').toggleClass('modal--active');
	 	});
		e.preventDefault();
	});
});
