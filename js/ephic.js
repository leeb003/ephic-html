/**************************************************************
 * Ephic Javascript - scripts for the template
 *************************************************************/

(function($) {
	"use strict";

	var myTemplate = window.myTemplate || {};

	/* Scroll to top */
	$(document).on('click', '#toparrow', function() {
		$('html, body').animate({scrollTop: 0}, 1000, 'swing');
		return false;
	});

	/* Smooth scroll function */
	$(document).on('click', 'ul.navbar-nav a', function(e) {
		var windowWidth = $(window).width();
		if ( $(e.target).is('a[href*="#"]:not([href="#"])') ) {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
				|| location.hostname == this.hostname) {

				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					var adjust = 0;
					if ($(window).scrollTop() < 300 && windowWidth > 991 ) {  
						// if we are at the top of the page add height for scrollbar
						var adjust = $('.navbar', '#mysticky-nav').outerHeight();
					} else if ($('#mysticky-nav.wrapfixed').length && windowWidth > 991 ) {
						var adjust = $('#mysticky-nav.wrapfixed').outerHeight();
					} else {
						var adjust = $('.navbar-header', '#mysticky-nav').outerHeight();
					}
					$('html,body').animate({
						scrollTop: target.offset().top - adjust
					}, 1000);
					return false;
				}
			}
		}
	});

	/* close small screen navigation on selection */
	$(function(){ 
		var navMain = $("#navbar");
		navMain.on("click", 'a[href]:not([href="#"])', null, function () {
			navMain.collapse('hide');
		});
 	});

	/* To Top display */
	$(window).scroll(function() {
		checkScroll();
	});
	function checkScroll() {
		var windowWidth = $(window).width();
		if ($(window).scrollTop() > 800 
			&& windowWidth > 768 ) {
			$('#toparrow').fadeIn();
		} else {
			$('#toparrow').fadeOut();
		}
	}

	
	/* Enable link hover with full menu */
	function hoverNavLinks() {
		var winWidth = $(window).width();
		if (winWidth >= 992) {
			/* Hover navbar dropdowns */
			$('.navbar [data-toggle="dropdown"]', '#mysticky-nav').bootstrapDropdownHover({
				// see next for specifications
			});

			// ADD SLIDEDOWN ANIMATION TO DROPDOWN //
			$('.dropdown', '#mysticky-nav').on('show.bs.dropdown', function(e){
				$(this).addClass('active-item');
				$(this).find('.dropdown-menu').first().stop(true, true).slideDown("fast");
			});

			// ADD SLIDEUP ANIMATION TO DROPDOWN //
			$('.dropdown', '#mysticky-nav').on('hide.bs.dropdown', function(e){
				$(this).removeClass('active-item');
				$(this).find('.dropdown-menu').first().stop(true, true).slideUp("fast");
			});
		}
	}

	$(window).load(function() {
		/* load in correct position function */
		if ($('.top-holder', '#totop').length ) {  
			var hash = window.location.hash;
			var headerOffset = top;
			if (hash.length) {
				$(document).scrollTop( $(hash).offset().top - $('.top-holder', '#totop').outerHeight() );
			}
		}
	
		/* Isotope Image Galleries */
		myTemplate.Isotope = function () {
			// 3 column layout
			var isotopeContainer = $('#isotope-container');
			if( !isotopeContainer.length || !jQuery().isotope ) return;
			isotopeContainer.isotope({
				itemSelector: '.isotopeSelector',
				layoutMode: 'masonry',
			});
			$('#isotope-filters').on( 'click', 'a', function(e) {
				$('#isotope-filters').find('.active').removeClass('active');
				$(this).parent().addClass('active');
				var filterValue = $(this).attr('data-filter');
				isotopeContainer.isotope({ filter: filterValue });
				e.preventDefault();
			});
			// Redraw parallax sections on isotope layout changes
			isotopeContainer.isotope('on', 'layoutComplete', function( isoInstance, laidOutItems ) {
				$(window).trigger('resize').trigger('scroll');
			});
 			//isotopeContainer.isotope('layout');
		};
		// Functions Initializers
		myTemplate.Isotope();

		/* Statistics elements Increment */
		if ($('#stats').length) {
			$('.stat', '#stats').waypoint(function(direction) {
				var $el_this = $(this),
					start = $el_this.attr('data-start'),
					stop = $el_this.attr('data-stop'), 
					speed = parseInt($el_this.attr('data-speed'));	
				$({inc:start}).animate({inc: stop}, {
					duration: speed,
					easing: 'swing',
					step: function(i) {
						$el_this.text(Math.ceil(i));
					}
				});
			}, { offset: '90%', triggerOnce: true });
		}
	 	/* scroll add class to menu items */
		if ($('section#intro').length) { // target an existing section on the home page for single page scrolling for this page only
			$('section').waypoint(function(direction) {
				if (direction === 'down') {
					var section = $(this).attr('id');
					navlinkSelect(section);
				}
   	 		}, { offset: '180'}).waypoint(function(direction) {
				if (direction === 'up') {
					var section = $(this).attr('id');
					navlinkSelect(section);
				}
			}, { offset: '-180'});
		}
		/* Add active class to navigation */
		function navlinkSelect(section) {
			var links = $('ul.navbar-nav a', '#navbar'),
				linksLength = links.length,
				i;
			for (i = 0; i < linksLength; i++) {
				var $link = $(links[i]);
				if ($link.attr('href') == '#' + section) {
					if ($link.parents().hasClass('dropdown')) {
						$link.closest('.dropdown').addClass('active-item');
					} else {
						$link.closest('li').addClass('active-item');
					}
				} else {
					$link.closest('li').removeClass('active-item');
				}
			}
		}
	});

	$(document).ready(function() {
		/* To Top visibility */
		checkScroll();
		/* Call hoverNavLinks function */
		hoverNavLinks();

		/* Fancybox */
		myTemplate.Fancybox = function () {
			$(".fancybox-pop").fancybox({
				maxWidth	: 900,
				maxHeight	: 700,
				padding     : 0,
				fitToView	: true,
				width		: 'auto',
				height		: 'auto',
				autoSize	: false,
				closeClick	: false,
				openEffect	: 'fade',
				closeEffect	: 'none',
				helpers : {
					title: {
						type: 'over'
					}
				}
			});
		};
	
		// Functions Initializers
		myTemplate.Fancybox();

		/* Features section Owl Carousel */
		$('#owl-carousel-features').owlCarousel ({
			items: 1,
			animateOut: 'fadeOut',
			autoplay: true,
			aotoplayTimeout: 8000,
			margin: 0,
			loop: true,
			smartSpeed: 450,
			onInitialized: owlNumbers,
			mouseDrag: false,
		});
		var owl = $('#owl-carousel-features').owlCarousel();
		// change dots to numbers
		function owlNumbers(e) {
			var dots = $('.owl-dots', '#owl-carousel-features').find('.owl-dot span'),
				dotsLength = dots.length;
			for(i = 0; i < dotsLength; i++) {
				var number = i + 1;
				$(dots[i]).text(number);
			}
		};
	});

	/* Main Page Form Submission */
	var form="form-send.php";  // The PHP handler script used that we submit to
	$(document).on('submit', '#contact', function() {
		var btnText = $('#submit').val();
		$('#submit').val('Sending...');
		$('#submit').attr('disabled', 'disabled');

		var name      = $('#contact .input_name').val();
		var email     = $('#contact .input_email').val();
		var subject   = $('#contact .input_subject').val();
		var message   = $('#contact .input_message').val();
		var from_form = 'main-page';
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: form,
			data: {from_form:from_form, name:name, email:email, subject: subject, message:message},
			success: function(response) {
				$('.response').html(response);
				$('#submit').val(btnText);
				$('#submit').removeAttr('disabled');
				$('#submit').hide();
				$('#contact-form').trigger('reset');
			}
		});
		return false;  // Don't trigger normal form post, since this handles it
	});

})(jQuery);
