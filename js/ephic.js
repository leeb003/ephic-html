/**************************************************************
 * Ephic Javascript - scripts for the template
 *************************************************************/

(function($) {
	"use strict";

	var myTemplate = window.myTemplate || {};

	/* Scroll to top */
	$(document).on('click', '.totop', function() {
    	$('html, body').animate({scrollTop: 0}, 600, 'swing');
    	return false;
	});

	/* Smooth scroll function */
	$(document).on('click', 'ul.navbar-nav a', function(e) {
		if ( $(e.target).is('a[href*="#"]:not([href="#"]') ) {
        	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            	|| location.hostname == this.hostname) {

            	var target = $(this.hash);
            	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            	if (target.length) {
				    var adjust = 0;
					if ($(window).scrollTop() < 300) {  // if we are at the top of the page add height for scrollbar
					    var adjust = $('.navbar').outerHeight();
					} else if ($('#mysticky-nav.wrapfixed').length) {
						var adjust = $('#mysticky-nav.wrapfixed').outerHeight();
					}
                	$('html,body').animate({
                    	scrollTop: target.offset().top - adjust
                	}, 1000);
                	return false;
            	}
        	}
    	}
	});

	
    /* Enable link hover with full menu */
    function hoverNavLinks() {
        var winWidth = $(window).width();
        if (winWidth >= 992) {
            /* Hover navbar dropdowns */
            $('.navbar [data-toggle="dropdown"]').bootstrapDropdownHover({
                // see next for specifications
            });

            // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
            $('.dropdown').on('show.bs.dropdown', function(e){
                $(this).find('.dropdown-menu').first().stop(true, true).slideDown("fast");
            });

            // ADD SLIDEUP ANIMATION TO DROPDOWN //
            $('.dropdown').on('hide.bs.dropdown', function(e){
                $(this).find('.dropdown-menu').first().stop(true, true).slideUp("fast");
            });
        }
    }

	/* Google Map Section */
	function initialize() {
        var myCenter = new google.maps.LatLng(39.7645187,-104.9951951);
        var mapProp = {
            center : myCenter,
            zoom : 13,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            draggable: !("ontouchend" in document),
        };
        var map = new google.maps.Map(document.getElementById("mapSection"), mapProp);
        var marker = new google.maps.Marker({
            position : myCenter,
            icon : 'img/map_marker.png'
        });
        marker.setMap(map);
    }

	$(window).load(function() {
		/* load in correct position function */
    	if ($('#totop .top-holder').length ) {  
        	var hash = window.location.hash;
        	var headerOffset = top;
        	if (hash.length) {
            	$(document).scrollTop( $(hash).offset().top - $('#totop .top-holder').outerHeight() );
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
	});


	$(document).ready(function() {
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
    		//animateIn: 'fadeIn',
			//autoHeight: true,
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
			//var count = e.item.count;
			var i = 1;
			$(document).find('.owl-dots .owl-dot span').each( function() {
				$(this).text(i);
				i++;
			});
		};
	});

	// Stats Increment
    $('.stats').waypoint(function(direction) {
		$('.stat').each( function() {
        //var $el_this = $(this).find('.stat');
			var $el_this = $(this);
        	var start = $el_this.attr('data-start');
        	var stop = $el_this.attr('data-stop');
        	var speed = parseInt($el_this.attr('data-speed'));
        	$({inc: start}).animate({inc: stop}, {
            	duration: speed,
            	easing: 'swing',
            	step: function(i) {
                	$el_this.text(Math.ceil(i));
            	}
        	});
		});
    }, { offset: '90%', triggerOnce: true });

	// Form submission
	var form="form-send.php";  // The PHP handler script used that we submit to

    // Main Page Form Submission
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
