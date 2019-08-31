var autoResize;
$(window).resize(function(event) {

	$('.js_slide-for').slick('setPosition');
	$('.js_slide-nav').slick('setPosition');

	clearTimeout(autoResize);
	autoResize = setTimeout(slideForOurNav, 400);
});

$(document).ready(initPage);
function initPage(){
	ImgTobg();
	mobileMenu();
	dropdownToggle();
	accordeon();
	tabs();
	headerFixedClass();
	initSlider();
	validateFields();
	enableClick();
	customSelect();
	slideForOurNav();

	$('[data-fancybox], .fancybox').fancybox({
		onInit: function(instance, slide){
			validateFields();
		}
	});
}

function ImgTobg() {
	$('.img-to-bg').each(function() {
		if ($(this).find('img').length) {
			$(this).css('background-image', 'url(' + $(this).find('> img').attr('src') + ')');
		}
	});
}

function mobileMenu(){
	$('<span class="open-menu"><span></span>').appendTo('.header-page > .container');
	$('<span class="fader"/>').appendTo('.header-page > .container');
	$('html').on('click', '.open-menu', function() {
		$('body').toggleClass('menu-opened');
		return false;
	});
	$('.fader').on('click touchmove', function(event) {
		$('body').removeClass('menu-opened');
	});
	$(document).on('touchmove', function(event) {
		if ($('body').hasClass('menu-opened') && $(window).width() < 992) {
			if ($('#main-nav').has(event.target).length) {
				return true;
			} else {
				event.preventDefault();
			}
		}
	});
}

function accordeon(){
	$(".accordeon dd").hide().prev().click(function() {
		$(".accordeon dl.current").removeClass("current");
		$(this).parents(".accordeon").find("dd").not(this).slideUp().prev().removeClass("active").parents("dl").removeClass("active");
		$(this).next().not(":visible").slideDown().prev().addClass("active").parents("dl").addClass("active");

	});
	$(".accordeon dl.current dd").show();
}

function tabs(){
	$('ul.tabs-caption').on('click', 'li:not(.active)', function() {
		$(this)
		.addClass('active').siblings().removeClass('active')
		.closest('div.tabs').find('div.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
	});
}

function dropdownToggle(){
	$('.dropdown-block__toggle').click(function(event){
		$(this).parent().toggleClass('open');
		event.preventDefault();
	});
	$(document).on('mouseup touchend ', function(e){
		var container = $('.dropdown-block');
		if ($(window).width() >= 992) {
			if (!container.is(e.target) && container.has(e.target).length === 0){
				container.removeClass('open');
			}
		}
	});
}

function headerFixedClass(){
	var heightEl  = 0;
	$(window).scrollTop() > heightEl ? $('.header-page').addClass('scrolled') : $('.header-page').removeClass('scrolled');
	$(window).scroll(function(){
		$(window).scrollTop() > heightEl ? $('.header-page').addClass('scrolled') : $('.header-page').removeClass('scrolled');
	});
}

function initSlider(){
	var sliderGallery = $('.gallery__slider');
	sliderGallery.slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: false,
		variableWidth: true,
		swipeToSlide: true
	});

	var sliderPartners = $('.partners__slider');
	sliderPartners.slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: false,
		dots: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		variableWidth: true,
		centerMode: true,
		swipeToSlide: true
	});

	var sliderPartners = $('.news__slider');
	sliderPartners.slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		dots: false,
		infinite: false,
		autoplay: false,
		autoplaySpeed: 5000,
		variableWidth: true,
		centerMode: false,
		swipeToSlide: true
	});

	var resizeTimer;
	$(window).on('resize', function(e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			sliderPartners.slick('setPosition');
			sliderGallery.slick('setPosition');
		}, 250);
	});
}

function validateFields(){
	$("._validate").validate({
		highlight: function(element) {
			$(element).parent().addClass('form__box_error').removeClass('form__box_valid');
		},
		unhighlight: function(element) {
			$(element).parent().removeClass('form__box_error').addClass('form__box_valid');
		},
		rules: {
			request: {
				required: false,
			},
			username: {
				required: true,
				minlength: 2,
				myName: true,
			},
			email: {
				required: true,
				myEmail: true,
			},
			phone: {
				required: false,
				myPhone: false,
			},
			message: {
				required: false,
				minlength: 0,
			}
		},
		messages: {
			request: {
				required: false,
			},
			username: {
				required: false,
				minlength: false,
				myName: false,
			},
			email: {
				required: false,
				email: false,
				myEmail: false,
			},
			phone: {
				required: false,
				myPhone: false,
			},
			message: {
				required: false,
				minlength: false,
			}
		}
	});
	$("._validate2").validate({
		highlight: function(element) {
			$(element).parent().addClass('form__box_error').removeClass('form__box_valid');
		},
		unhighlight: function(element) {
			$(element).parent().removeClass('form__box_error').addClass('form__box_valid');
		},
		rules: {
			request: {
				required: false,
			},
			companyname: {
				required: true,
				minlength: 0,
			},
			email: {
				required: true,
				myEmail: true,
			},
			country: {
				required: true,
				minlength: 0,
			},
			question: {
				required: true,
				minlength: 0,
			},
			message: {
				required: true,
				minlength: 0,
			},
		},
		messages: {
			request: {
				required: false,
			},
			companyname: {
				required: false,
				minlength: false,
			},
			email: {
				required: false,
				email: false,
				myEmail: false,
			},
			country: {
				required: false,
				minlength: false,
			},
			question: {
				required: false,
				minlength: false,
			},
			message: {
				required: false,
				minlength: false,
			}
		}
	});
	$.validator.addMethod(
		"myName",
		function(value, element){
			return value.match(/^[A-Za-zА-Яа-яЁё\s]+$/);
		}
	);
	$.validator.addMethod(
		"myPhone",
		function(value, element){
			return value.match(/[0-9\-\(\)\s]+/);
		}
	);
	$.validator.addMethod(
		"myEmail",
		function(value, element){
			return value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		}
	);
}

function enableClick(){
	$('.form-group-check').on('click', function(){
		var check = $(this).find('input').prop("checked");
		console.log(check);
		if ( check == true ){
			$(this).parents('form').find('.form-group-button-dis, .form-group-button').removeClass('btn-disable');
			$(this).parents('form').find('.form-group-button-dis, .form-group-button').prop('disabled',false);
		} else {
			$(this).parents('form').find('.form-group-button-dis, .form-group-button').addClass('btn-disable');
			$(this).parents('form').find('.form-group-button-dis, .form-group-button').prop('disabled',true);
		}
	});
}

function customSelect(){
	jcf.setOptions('Select', {
		wrapNative: false,
		wrapNativeOnMobile: false,
		useCustomScroll: false,
		
	});

	jcf.replaceAll();
}

function mapInitialize(map_) {
	var latlng = new google.maps.LatLng(48.98021699, 18.17138672);
	var myOptions = {
		center: latlng,
		zoom: 5,
		zoomControl: true,
		scaleControl: true,
		//scrollwheel: true,
		//mapTypeControl: false,
		//streetViewControl: false,
		//rotateControl: false,
		//disableDoubleClickZoom: true
	};
	var map = new google.maps.Map(document.getElementById(map_), myOptions);
	var stylesBW = [
		{
			featureType: "all",
			stylers: [
				{ saturation: 0 }
			]
		}
	];
	map.setOptions({styles: stylesBW});
	function addMarker(feature) {
		var marker = new google.maps.Marker({
			position: feature.position,
			icon: '../images/ico-marker.png',
			map: map
		});
	}
	var features = [
		{
			position: new google.maps.LatLng(49.98696603, 36.23341978)
		},
		{
			position: new google.maps.LatLng(49.19396603, 36.95641978)
		},
		{
			position: new google.maps.LatLng(49.50396603, 36.45641978)
		},
		{
			position: new google.maps.LatLng(49.12396603, 36.42341978)
		}
	];

	for (var i = 0, feature; feature = features[i]; i++) {
		addMarker(feature);
	}
}
$('#map').each(function(){
	var map_ = $(this).attr('id');
	mapInitialize(map_);
});


function slideForOurNav(){
	$('.js_slide-for').not('.slick-initialized').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		fade: true,
		centerMode: true,
		focusOnSelect: true,
		asNavFor: '.js_slide-nav',
		adaptiveHeight: true,
	});
	$('.js_slide-nav').not('.slick-initialized').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.js_slide-for',
		arrows: true,
		dots: false,
		centerMode: false,
		centerPadding: '25px',
		focusOnSelect: true,
		swipeToSlide: true
	});
}