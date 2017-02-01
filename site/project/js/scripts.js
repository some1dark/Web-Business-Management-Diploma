(function( $ ){

	"use strict";
	
	var handheldBreakpoint = 980;	//media query breakpoint at which the mobile menu is shown

	// seamless internal links scroll
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, function () {
	        window.location.hash = target;
	    });
	});

	//  dropdownmenu, megamenu
	jQuery('.children, .sub-menu').hide();
	jQuery('#header nav #menu > ul li:has(ul)').on('mouseenter', function() {
		if ( jQuery(window).width() > handheldBreakpoint ) {
			var $this = jQuery(this);
			$this.addClass('active-parent');
			$this.find('> .children, > .sub-menu').stop(true).delay(150).slideDown(200);	
		}
	}).on('mouseleave', function() {
		if ( jQuery(window).width() > handheldBreakpoint ) {
			var $this = jQuery(this);
			$this.find('> .children, > .sub-menu').stop(true).delay(150).slideUp(150, function() {	
				$this.removeClass('active-parent');
			});	
		}
	});
	

	// header menu burger
	jQuery('#header nav #menu-burger').on('click', function() {
		jQuery('#header nav #menu').toggleClass('menu-shown');
	});

	// header searchbar
	var $searchbar_icon = jQuery('#header nav #searchicon');
	if ( $searchbar_icon.length > 0 ) {
		var $searchbar_hidden = true;
		$searchbar_icon.on('click', function() {
			if ( $searchbar_hidden ) {
				jQuery('#header nav form#searchbar').stop().animate({ 'opacity': 1, 'width': '180px' }, function() {
					jQuery('#header nav #searchbar-input').delay(1000).focus();
					jQuery('#header #logo').addClass('searchbar-expanded'); // hide also logo if on mobile
				});
				var i = 0;
				if (jQuery(window).width() > handheldBreakpoint) {
					jQuery('#header nav #menu > ul > li').reverse().each( function() {
						jQuery(this).delay(i).animate( { 'opacity': 0 } );
						i = i + 50;
					});
				}
				$searchbar_hidden = false;
			} else {
				jQuery('#header nav form#searchbar').stop().animate( { 'opacity': 0, 'width': '0' } );
				var i = 0;
				jQuery('#header nav #menu > ul > li').each( function() {
					jQuery(this).delay(i).animate( { 'opacity': 1 } );
					i = i + 50;
				});
				jQuery('#header #logo').removeClass('searchbar-expanded');
				$searchbar_hidden = true;
			}
		});
	}
	jQuery.fn.reverse = [].reverse;

	// svg line drawing logo
	var $svg_logo = jQuery('#logo-svg-animated');
	if ( $svg_logo.length > 0 ) {
		/* 
		 * Lazy Line Painter - Path Object 
		 * Generated using 'SVG to Lazy Line Converter'
		 * 
		 * http://lazylinepainter.info 
		 * Copyright 2013, Cam O'Connell  
		 *  
		 */ 
		 
		var pathObj = {
		    "logo-svg-animated": {
			   "strokepath": [
				  {
                "path": "M30.3,86c0,0,0,1.8,1.6,2.5  s10.7,1.4,10.7,3.3s-7.7,1.8-15,1.8s-15,0-15-1.8c0-1.9,9.2-2.6,10.7-3.3c1.6-0.7,1.6-2.5,1.6-2.5V62.8c-0.8-11-12.4-12.9-14.3-28  C8.6,19.4,12.5,10,12.5,10h15.2h15.2c0,0,3.8,9.3,1.9,24.7C42.8,50.1,31,51.8,30.4,63.2L30.3,86z M27.9,13.8H15.6c0,0-0.4,1-0.5,1.3  c-1.2,5.3-1.6,11.7-0.6,19.1c0.7,5.3,2.4,8.6,6.2,13c0.3,0.4,1.9,2.2,2.3,2.6c2.4,2.8,3.9,5.1,4.9,7.7c0.7-2.6,2.3-5,4.7-7.7  c0.4-0.5,1.9-2.2,2.3-2.6c3.8-4.4,5.5-7.7,6.2-13c0.9-7.4,0.5-13.8-0.6-19.1c-0.1-0.3-0.5-1.3-0.5-1.3H27.5H27.9z",
                "duration": 2400
            },
            {
                "path": "M45.9,54.1v23.2c0,0,0,1.8-1.6,2.5c-1.6,0.7-10.7,1.4-10.7,3.3s7.7,1.8,15,1.8s15,0,15-1.8  c0-1.9-9.2-2.6-10.7-3.3c-1.6-0.7-1.6-2.5-1.6-2.5l0.1-22.8C52,43.2,63.9,41.5,65.8,26.1c1.9-15.4-1.9-24.7-1.9-24.7H33.5  c0,0-0.5,1.3-1.1,3.8h28.5c0,0,0.4,1,0.5,1.3c1.2,5.3,1.6,11.7,0.6,19.1c-0.7,5.3-2.4,8.6-6.2,13c-0.3,0.4-1.9,2.2-2.3,2.6  c-2.4,2.8-3.9,5.1-4.7,7.7c-0.5-1.3-1.1-2.5-1.9-3.8c-0.7,1.2-1.5,2.4-2.5,3.7C45.2,50.4,45.7,52.1,45.9,54.1L45.9,54.1z",
                "duration": 1800
            }
			   ],
			   "dimensions": {
				  "width": 80,
				  "height": 95
			   }
		    }
		}; 
		 
		jQuery(window).load( function() {
			setTimeout( function() {		// wait till the loadscreen animation finishes
				$('#logo-svg-animated').lazylinepainter({
				    "svgData": pathObj,
				    "strokeWidth": 1.5
				}).lazylinepainter('paint'); 
			}, 1000);
		});
	}
	// END OF SVG ANIMATION

	// init Magnific popup
	jQuery('a.popup').magnificPopup({
	  type: 'image',
	  gallery:{enabled:true},
	  titleSrc: 'alt',
	  cursor: 'mfp-zoom-out-cur'
	});
	
	// remove title on img hover
	var imgTitle;
	jQuery("img, a").on('hover', function(){
		imgTitle = jQuery(this).attr("title");
		jQuery(this).removeAttr("title");
	}, function(){
	   jQuery(this).attr("title", imgTitle);
	});

	// fullscreen gallery
	var $fullscreen_gallery = jQuery('.fullscreen-gallery.gallery');
	if ( $fullscreen_gallery.length > 0 ) {

		if ( $fullscreen_gallery.find('.gallery-item').length > 1 ) { // if there are more than 1 image
			
			if ( !$fullscreen_gallery.hasClass('kenburns-gallery') ) {	// do not initialize if kenburns
				jQuery('#footer').prepend('<nav id="gallerynav"><a href="#" class="thumbs">	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">	<rect width="5" height="5" x="0"   y="0" /><rect width="5" height="5" x="8" y="0" /><rect width="5" height="5" x="0" y="8" /><rect width="5" height="5" x="8" y="8" /></svg></a><a href="#" class="prev">&lt;</a> <a href="#" class="pause">&#9614;&#9614;</a> <a href="#" class="next">&gt;</a></nav>');

				$fullscreen_gallery.before('<ul id="gallerythumbs">').cycle({
					slideExpr: '.gallery-item',
					fx:        'fade', 
		   			speed:     1000, 
					timeout:   5000,
					pager:   	 '#gallerythumbs', 
					slideResize: true,
					containerResize: true,
					width: '100%',
					height: '100%',
					fit: 1,
					cleartypeNoBg : true,
					pagerAnchorBuilder: function(idx, slide) { 
					   return '<li><a href="#"><img src="' + jQuery(slide).find('img').attr('src') + '" alt="" /></a></li>'; 
					},
					prev:    '#gallerynav .prev',
			  		next:    '#gallerynav .next'
				});
				var paused = false;
				jQuery('#gallerynav .pause').on('click', function() { 
					if ( !paused ) {
						$fullscreen_gallery.cycle('pause');
						paused = true;
					} 
					else {
						$fullscreen_gallery.cycle('resume'); 
						paused = false;
					}
					jQuery(this).toggleClass('active');
				});
				// show/hide thumbs
				var revealed = false;
				jQuery('#gallerynav a.thumbs').on('click', function() { 	// if clicked on svg button
					// show thumbs wrapper
					jQuery('#gallerythumbs').toggleClass('reveal');
					// show thumbs
					if (!revealed) {
						jQuery('body').addClass('gallerythumbsrevealed');
						revealed = true;
					}
					// hide thumbs
					else {
						jQuery('body').removeClass('gallerythumbsrevealed');
						revealed = false;
					}
					// pause cycling
					$fullscreen_gallery.cycle('pause');
					paused = true;
				});
				jQuery('#gallerythumbs').on('click', function() { // if clicked on a thumb (large image will be automatically shown) or somewhere else
					// hide thumbs wrapper
					jQuery('#gallerythumbs').toggleClass('reveal'); 
					jQuery('body').removeClass('gallerythumbsrevealed');
					// resume cycling
					$fullscreen_gallery.cycle('resume'); 
					paused = false;
					revealed = false;
				});
				// scroll gallery thumbs with mousewheel
				jQuery('#gallerythumbs').on('mousewheel', function(event) {
				    if (event.deltaY < 0) { // scroll right
						jQuery('#gallerythumbs').stop().animate({scrollLeft: '+=180px' }, 300); 
				    }
				    else {
						jQuery('#gallerythumbs').stop().animate({scrollLeft: '-=180px' }, 300); 
				    }
				});
			}
		}
	}

	// carousel
	var $blog_mini_carousel = jQuery('.blog-oneline-carousel');
	if ( $blog_mini_carousel.length > 0 ) {
		
			$blog_mini_carousel.tinycarousel({
				axis   : "y",
				interval: true,
				intervalTime: 4000
			});
	}

	// kenburns on one featured image header image
	var $kenburns = jQuery('.kenburns-gallery.gallery');
	if ( $kenburns.length > 0 ) {
		var gallery_set = [];
		$kenburns.find('.gallery-icon img').each( function() {
			gallery_set.push(jQuery(this).attr('src'));
		});

		jQuery('#kenburns').attr('width', jQuery(window).width());
		jQuery('#kenburns').attr('height', jQuery(window).height());
		jQuery('#kenburns').kenburns({
			images: gallery_set,
			frames_per_second: 29,
			display_time: 8000,
			fade_time: 1500,
			zoom: 1.4,
			background_color:'#F7F6F5'
		});
	}

	
	// horizontal reel gallery
	var $horizontal_gallery = jQuery('.gallery.horizontal-gallery');
	if ( $horizontal_gallery.length > 0 ) {
		
		var	scrollRightTo   = 0
		,	galleryWidth	 = 0
		,	scrollDragWidth = 0
		,	windowWidth	 = jQuery(window).width()
		;

		jQuery(window).load( function() {
			jQuery('.gallery-item').each(function() {
				galleryWidth += jQuery(this).width();	
			});

			scrollDragWidth = (( windowWidth / galleryWidth ) * windowWidth );
			galleryWidth = galleryWidth - 2*scrollDragWidth;
		});

		// make gallery scrollable with mousewheel
		$horizontal_gallery.on('mousewheel', function(event, delta) {
			
			event.preventDefault();
			if (delta < 0) { // scroll right
				if ( scrollRightTo < galleryWidth ) { 
					scrollRightTo = scrollRightTo+320; }	// add +1 only if the end is not reached yet
			}
			else {	// scroll left
				if ( scrollRightTo > 0 ) { 
					scrollRightTo = scrollRightTo-320; }		// subtract i only if it's not yet less that zero
			}

			// move the content and scroll track
			$horizontal_gallery.stop().animate({scrollLeft: scrollRightTo+'px' }, 1000, 'swing');
		   
		});		

		// on keyboard press, scroll horizontally
		$(document).on('keydown', function(e) {
			if(e.keyCode == 39) { // right
				if ( i < $('.gallery-item').length) { 
					i = i+1; 
					scrollRightTo = scrollRightTo+320; }
			}
			else if(e.keyCode == 37) { // left
				if ( i > 1 ) { 
					i = i-1; 	
					scrollRightTo = scrollRightTo-320; }
			}
			// move the content and scroll track
			$horizontal_gallery.stop().animate({scrollLeft: scrollRightTo+'px' }, 400, 'swing');
		
		});
		

		$horizontal_gallery.find('.gallery-icon a').on('click', function(event) {
			event.preventDefault();
		});

		// make gallery draggable
		

	}

	// vertical gallery
	var $vertical_gallery = jQuery('.gallery.vertical-gallery');
	if ( $vertical_gallery.length > 0 ) {

		$vertical_gallery.before('<div id="gallerypuntiks">').cycle({
			slideExpr: '.gallery-item',
			fx:        'scrollDown', 
   			speed:     600, 
			timeout:   5000,
			pager:   	 '#gallerypuntiks', 
			cleartypeNoBg : true,
			animIn: { opacity: 1 },
			animOut: { opacity: 0 },
			before: function(currSlideElement, nextSlideElement) {
				$(nextSlideElement).find('.gallery-caption').delay(200).animate({'opacity': 1},1000);
			},
			after: function(currSlideElement, nextSlideElement) {
				$(nextSlideElement).find('.gallery-caption').delay(5000).animate({'opacity': 0},1000);
			}
		});
	}
	
	
	// load screen
	jQuery('body.home.loading').height( jQuery(window).height() ) ;
	jQuery( "a:not(#gallery-filter a, #grid-changer a)" ).on( 'click', function( e ) {
		var link = $( this ).attr( 'href' );

		if ( $( this ).attr( 'id' ) != 'votelikebutton' && $( this ).attr( 'target' ) != '_blank' && link.indexOf( '.jpg' ) < 0 && link.indexOf( '.jpeg' ) < 0 && link.indexOf( '.png' ) < 0 && link.indexOf( '.gif' ) < 0 && link.indexOf( '#' ) < 0 ) {
			$( '.loadreveal').removeClass('reveal');
			setTimeout( function() {
				window.location.href=link;
			}, 400 );
			e.preventDefault();
		}
	});
	
	
	/* ********* WINDOW LOAD ********** */
	jQuery(window).load(function() {
	
		// load screen
		jQuery('.loadreveal').addClass('reveal');
		jQuery('#loadscreen').stop().animate( { opacity: 0 }, 200, function() {
			jQuery('body.home').removeClass('loading');
			jQuery(this).hide();
		});
	
	
		// masonry gallery
		var $masonry_gallery = jQuery('.masonry-gallery.gallery');
		if ( $masonry_gallery.length > 0 ) {

			$masonry_gallery.each( function(index, element) {
				var $masonry_items = $(element).find('.gallery-item');
			
				// set masonry layout
				$(element).isotope({
					masonry: { columnWidth: $(element).find('.gallery-item')[0] },
					itemSelector: '.gallery-item'
				});
				$(element).isotope('layout');
					
				// filtering
				jQuery('#gallery-filter li a').on('click', function(){
					jQuery('#gallery-filter li a').removeClass('active');
					jQuery(this).addClass('active');
					var selector = jQuery(this).attr('data-filter');
					$masonry_gallery.isotope({ filter: selector });
					return false;
				});

				// changing layout
				jQuery('#grid-changer li a').on('click', function(){
					jQuery('#grid-changer li a').removeClass('active');
					jQuery(this).toggleClass('active');

					$masonry_items.removeClass('col-3');
					$masonry_items.removeClass('col-4');
					$masonry_items.removeClass('col-5');
					$masonry_items.toggleClass(jQuery(this).closest('li').attr('class'));
					$masonry_gallery.isotope('layout');
				});
			
			});
		}

		
		// before-after
		var $before_after = jQuery('.before-after.gallery');
		if ( $before_after.length > 0 ) {
			$before_after.imageReveal({
				barWidth: 4,
				touchBarWidth: 50,
				startPosition: 0.5,
				width: jQuery('.before-after img').width(),
				height:  jQuery('.before-after img').height()
			});
		}

		// changing blog layout
		var $blog_layout = jQuery('#blog-timeline');
		if ( $blog_layout.length > 0 ) {
	
			jQuery('#grid-changer li a').on('click', function(){
				jQuery('#grid-changer li a').removeClass('active');
				jQuery(this).toggleClass('active');

				$blog_layout.closest('.wrapper').toggleClass('blog-masonry');
				
				if ( $blog_layout.closest('.wrapper').hasClass('blog-masonry') ) {
					jQuery('#blog-post').animate({'left': '100%'}, 400, function() {
						// set masonry layout
						$blog_layout.isotope({
							masonry: { columnWidth: $blog_layout.find('article')[0], gutter: 60 },
							itemSelector: 'article'
						});
						$blog_layout.isotope('layout');
						jQuery('#blog-post').hide();
					});
				}
				else {
					jQuery('#blog-post').show().animate({'left': '0'}, 400 );
					$blog_layout.isotope('destroy');
					
					if ( $masonry_gallery.length > 0 ) {
						$masonry_gallery.isotope('layout');
					}
				}
			});
		}
	});
	

} )( jQuery );
