/*---------------------------------------------------------------------------------------------

@author       Constantin Saguin - @brutaldesign
<<<<<<< HEAD
@link            http://bsign.co
@github        http://github.com/brutaldesign/swipebox
@version     1.1.2
=======
@link            http://csag.co
@github        http://github.com/brutaldesign/swipebox
@version     1.2
>>>>>>> origin/master
@license      MIT License

----------------------------------------------------------------------------------------------*/

;(function (window, document, $, undefined) {
	
	$.swipebox = function(elem, options) {

		var defaults = {
			useCSS : true,
<<<<<<< HEAD
			hideBarsDelay : 3000
		},
		
			plugin = this,
			$elem = $(elem),
			elem = elem,
			selector = elem.selector,
			$selector = $(selector),
			isTouch = document.createTouch !== undefined || ('ontouchstart' in window) || ('onmsgesturechange' in window) || navigator.msMaxTouchPoints,
			supportSVG = !!(window.SVGSVGElement),
			html = '<div id="swipebox-overlay">\
					<div id="swipebox-slider"></div>\
					<div id="swipebox-caption"></div>\
					<div id="swipebox-action">\
						<a id="swipebox-close"></a>\
						<a id="swipebox-prev"></a>\
						<a id="swipebox-next"></a>\
					</div>\
			</div>';
=======
			hideBarsDelay : 3000,
			videoMaxWidth : 1140,
			vimeoColor : 'CCCCCC',
			beforeOpen: null,
		      	afterClose: null
		},
		
		plugin = this,
		elements = [], // slides array [{href:'...', title:'...'}, ...],
		elem = elem,
		selector = elem.selector,
		$selector = $(selector),
		isTouch = document.createTouch !== undefined || ('ontouchstart' in window) || ('onmsgesturechange' in window) || navigator.msMaxTouchPoints,
		supportSVG = !!(window.SVGSVGElement),
		html = '<div id="swipebox-overlay">\
				<div id="swipebox-slider"></div>\
				<div id="swipebox-caption"></div>\
				<div id="swipebox-action">\
					<a id="swipebox-close"></a>\
					<a id="swipebox-prev"></a>\
					<a id="swipebox-next"></a>\
				</div>\
		</div>';
>>>>>>> origin/master

		plugin.settings = {}

		plugin.init = function(){

			plugin.settings = $.extend({}, defaults, options);
<<<<<<< HEAD
			
			$selector.click(function(e){
				e.preventDefault();
				e.stopPropagation();
				index = $elem.index($(this));
				ui.target = $(e.target);
				ui.init(index);
			});
=======

			if ($.isArray(elem)) {

				elements = elem;
				ui.target = $(window);
				ui.init(0);

			}else{

				$selector.click(function(e){
					elements = [];
					var index , relType, relVal;

					if (!relVal) {
						relType = 'rel';
						relVal  = $(this).attr(relType);
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						$elem = $selector.filter('[' + relType + '="' + relVal + '"]');
					}else{
						$elem = $(selector);
					}

					$elem.each(function(){

						var title = null, href = null;
						
						if( $(this).attr('title') )
							title = $(this).attr('title');

						if( $(this).attr('href') )
							href = $(this).attr('href');

						elements.push({
							href: href,
							title: title
						});
					});
					
					index = $elem.index($(this));
					e.preventDefault();
					e.stopPropagation();
					ui.target = $(e.target);
					ui.init(index);
				});
			}
		}

		plugin.refresh = function() {
			if (!$.isArray(elem)) {
				ui.destroy();
				$elem = $(selector);
				ui.actions();
			}
>>>>>>> origin/master
		}

		var ui = {

			init : function(index){
<<<<<<< HEAD
				this.target.trigger('swipebox-start');
				this.build();
				this.openSlide(index);
				this.openImg(index);
				this.preloadImg(index+1);
				this.preloadImg(index-1);
=======
				if (plugin.settings.beforeOpen) 
					plugin.settings.beforeOpen();
				this.target.trigger('swipebox-start');
				$.swipebox.isOpen = true;
				this.build();
				this.openSlide(index);
				this.openMedia(index);
				this.preloadMedia(index+1);
				this.preloadMedia(index-1);
>>>>>>> origin/master
			},

			build : function(){
				var $this = this;
				
				$('body').append(html);

				if($this.doCssTrans()){
					$('#swipebox-slider').css({
						'-webkit-transition' : 'left 0.4s ease',
						'-moz-transition' : 'left 0.4s ease',
						'-o-transition' : 'left 0.4s ease',
						'-khtml-transition' : 'left 0.4s ease',
						'transition' : 'left 0.4s ease'
					});
					$('#swipebox-overlay').css({
						'-webkit-transition' : 'opacity 1s ease',
						'-moz-transition' : 'opacity 1s ease',
						'-o-transition' : 'opacity 1s ease',
						'-khtml-transition' : 'opacity 1s ease',
						'transition' : 'opacity 1s ease'
					});
					$('#swipebox-action, #swipebox-caption').css({
						'-webkit-transition' : '0.5s',
						'-moz-transition' : '0.5s',
						'-o-transition' : '0.5s',
						'-khtml-transition' : '0.5s',
						'transition' : '0.5s'
					});
				}


				if(supportSVG){
					var bg = $('#swipebox-action #swipebox-close').css('background-image');
					bg = bg.replace('png', 'svg');
					$('#swipebox-action #swipebox-prev,#swipebox-action #swipebox-next,#swipebox-action #swipebox-close').css({
						'background-image' : bg
					});
				}
				
<<<<<<< HEAD
				$elem.each(function(){
=======
				$.each( elements,  function(){
>>>>>>> origin/master
					$('#swipebox-slider').append('<div class="slide"></div>');
				});

				$this.setDim();
				$this.actions();
				$this.keyboard();
				$this.gesture();
				$this.animBars();
<<<<<<< HEAD

				$(window).resize(function() {
					$this.setDim();
				}).resize();
=======
				$this.resize();
>>>>>>> origin/master
			},

			setDim : function(){
				var sliderCss = {
<<<<<<< HEAD
					width : $(window).width(),
					height : window.innerHeight ? window.innerHeight : $(window).height() // fix IOS bug
				}

				$('#swipebox-overlay').css(sliderCss);
=======
					width : window.innerWidth ? window.innerWidth : $(window).width(),
					height : window.innerHeight ? window.innerHeight : $(window).height()
				}

				$('#swipebox-overlay').css(sliderCss);
			},

			resize : function(){
				
				var $this = this;

				$(window).resize(function() {
					$this.setDim();
				}).resize();
>>>>>>> origin/master

			},

			supportTransition : function() {
				var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition'.split(' ');
				for(var i = 0; i < prefixes.length; i++) {
					if(document.createElement('div').style[prefixes[i]] !== undefined) {
						return prefixes[i];
					}
				}
				return false;
			},

			doCssTrans : function(){
				if(plugin.settings.useCSS && this.supportTransition() ){
					return true;
				}
			},

			gesture : function(){
				if ( isTouch ){
					var $this = this,
					distance = null,
					swipMinDistance = 10,
<<<<<<< HEAD
					startCoords = {}, 
					endCoords = {};
					var b = $('#swipebox-caption, #swipebox-action');

					b.addClass('visible-bars');
					$this.setTimeout();
					
=======
					startCoords = {},
					endCoords = {};
					var bars = $('#swipebox-caption, #swipebox-action');

					bars.addClass('visible-bars');
					$this.setTimeout();

>>>>>>> origin/master
					$('body').bind('touchstart', function(e){

						$(this).addClass('touching');

		  				endCoords = e.originalEvent.targetTouches[0];
		    				startCoords.pageX = e.originalEvent.targetTouches[0].pageX;

						$('.touching').bind('touchmove',function(e){
							e.preventDefault();
							e.stopPropagation();
		    					endCoords = e.originalEvent.targetTouches[0];

						});
			           			
			           			return false;

	           			}).bind('touchend',function(e){
	           				e.preventDefault();
<<<<<<< HEAD
						e.stopPropagation();
	   				
	   					distance = endCoords.pageX - startCoords.pageX;
	       				
	       				if( distance >= swipMinDistance ){
	       					// swipeLeft
	       					$this.getPrev();
	       				}

	       				else if( distance <= - swipMinDistance ){
=======
					e.stopPropagation();
   				
   					distance = endCoords.pageX - startCoords.pageX;
	       				
	       				if( distance >= swipMinDistance ){
	       					
	       					// swipeLeft
	       					$this.getPrev();
	       				
	       				}else if( distance <= - swipMinDistance ){
	       					
>>>>>>> origin/master
	       					// swipeRight
	       					$this.getNext();
	       				
	       				}else{
	       					// tap
<<<<<<< HEAD
	       					if(!b.hasClass('visible-bars')){
=======
	       					if(!bars.hasClass('visible-bars')){
>>>>>>> origin/master
							$this.showBars();
							$this.setTimeout();
						}else{
							$this.clearTimeout();
							$this.hideBars();
						}

	       				}	

	       				$('.touching').off('touchmove').removeClass('touching');
						
					});

<<<<<<< HEAD
           			}
=======
           				}
>>>>>>> origin/master
			},

			setTimeout: function(){
				if(plugin.settings.hideBarsDelay > 0){
					var $this = this;
					$this.clearTimeout();
					$this.timeout = window.setTimeout( function(){
						$this.hideBars() },
						plugin.settings.hideBarsDelay
					);
				}
			},
			
			clearTimeout: function(){	
				window.clearTimeout(this.timeout);
				this.timeout = null;
			},

			showBars : function(){
<<<<<<< HEAD
				var b = $('#swipebox-caption, #swipebox-action');
				if(this.doCssTrans()){
					b.addClass('visible-bars');
=======
				var bars = $('#swipebox-caption, #swipebox-action');
				if(this.doCssTrans()){
					bars.addClass('visible-bars');
>>>>>>> origin/master
				}else{
					$('#swipebox-caption').animate({ top : 0 }, 500);
					$('#swipebox-action').animate({ bottom : 0 }, 500);
					setTimeout(function(){
<<<<<<< HEAD
						b.addClass('visible-bars');
=======
						bars.addClass('visible-bars');
>>>>>>> origin/master
					}, 1000);
				}
			},

			hideBars : function(){
<<<<<<< HEAD
				var b = $('#swipebox-caption, #swipebox-action');
				if(this.doCssTrans()){
					b.removeClass('visible-bars');
=======
				var bars = $('#swipebox-caption, #swipebox-action');
				if(this.doCssTrans()){
					bars.removeClass('visible-bars');
>>>>>>> origin/master
				}else{
					$('#swipebox-caption').animate({ top : '-50px' }, 500);
					$('#swipebox-action').animate({ bottom : '-50px' }, 500);
					setTimeout(function(){
<<<<<<< HEAD
						b.removeClass('visible-bars');
=======
						bars.removeClass('visible-bars');
>>>>>>> origin/master
					}, 1000);
				}
			},

			animBars : function(){
				var $this = this;
<<<<<<< HEAD
				var b = $('#swipebox-caption, #swipebox-action');
					
				b.addClass('visible-bars');
				$this.setTimeout();
				
				$('#swipebox-slider').click(function(e){
					if(!b.hasClass('visible-bars')){
=======
				var bars = $('#swipebox-caption, #swipebox-action');
					
				bars.addClass('visible-bars');
				$this.setTimeout();
				
				$('#swipebox-slider').click(function(e){
					if(!bars.hasClass('visible-bars')){
>>>>>>> origin/master
						$this.showBars();
						$this.setTimeout();
					}
				});

				$('#swipebox-action').hover(function() {
				  		$this.showBars();
<<<<<<< HEAD
						b.addClass('force-visible-bars');
						$this.clearTimeout();
					
					},function() { 
						b.removeClass('force-visible-bars');
=======
						bars.addClass('force-visible-bars');
						$this.clearTimeout();
					
					},function() { 
						bars.removeClass('force-visible-bars');
>>>>>>> origin/master
						$this.setTimeout();

				});
			},

			keyboard : function(){
				var $this = this;
				$(window).bind('keyup', function(e){
					e.preventDefault();
					e.stopPropagation();
					if (e.keyCode == 37){
						$this.getPrev();
					}
					else if (e.keyCode==39){
						$this.getNext();
					}
					else if (e.keyCode == 27) {
						$this.closeSlide();
					}
				});
			},

			actions : function(){
				var $this = this;
				
<<<<<<< HEAD
				if( $elem.length < 2 ){
=======
				if( elements.length < 2 ){
>>>>>>> origin/master
					$('#swipebox-prev, #swipebox-next').hide();
				}else{
					$('#swipebox-prev').bind('click touchend', function(e){
						e.preventDefault();
						e.stopPropagation();
						$this.getPrev();
						$this.setTimeout();
					});
					
					$('#swipebox-next').bind('click touchend', function(e){
						e.preventDefault();
						e.stopPropagation();
						$this.getNext();
						$this.setTimeout();
					});
				}

				$('#swipebox-close').bind('click touchend', function(e){
					$this.closeSlide();
				});
			},
			
			setSlide : function (index, isFirst){
				isFirst = isFirst || false;
				
				var slider = $('#swipebox-slider');
				
				if(this.doCssTrans()){
					slider.css({ left : (-index*100)+'%' });
				}else{
					slider.animate({ left : (-index*100)+'%' });
				}
				
				$('#swipebox-slider .slide').removeClass('current');
				$('#swipebox-slider .slide').eq(index).addClass('current');
				this.setTitle(index);

				if( isFirst ){
					slider.fadeIn();
				}

				$('#swipebox-prev, #swipebox-next').removeClass('disabled');
				if(index == 0){
					$('#swipebox-prev').addClass('disabled');
<<<<<<< HEAD
				}else if( index == $elem.length - 1 ){
=======
				}else if( index == elements.length - 1 ){
>>>>>>> origin/master
					$('#swipebox-next').addClass('disabled');
				}
			},
		
			openSlide : function (index){
<<<<<<< HEAD
				
=======
>>>>>>> origin/master
				$('html').addClass('swipebox');
				$(window).trigger('resize'); // fix scroll bar visibility on desktop
				this.setSlide(index, true);
			},
		
<<<<<<< HEAD
			preloadImg : function (index){
				var $this = this;
				setTimeout(function(){
					$this.openImg(index);
				}, 1000);
			},
			
			openImg : function (index){
				var $this = this;
				if(index < 0 || index >= $elem.length){
					return false;
				}

				$this.loadImg($elem.eq(index).attr('href'), function(){
					$('#swipebox-slider .slide').eq(index).html(this);
				});
			},


			setTitle : function(index, isFirst){
				$('#swipebox-caption').empty();
				
				if($elem.eq(index).attr('title')){
					$('#swipebox-caption').append($elem.eq(index).attr('title'));
				}
			},
			
			loadImg : function (src, callback){
				var img = $('<img>').on('load', function(){
					callback.call(img);
				});
				
				img.attr('src',src);
=======
			preloadMedia : function (index){
				var $this = this, src = null;

				if( elements[index] !== undefined )
					src = elements[index].href;

				if( !$this.isVideo(src) ){
					setTimeout(function(){
						$this.openMedia(index);
					}, 1000);
				}else{
					$this.openMedia(index);
				}
			},
			
			openMedia : function (index){
				var $this = this, src = null;

				if( elements[index] !== undefined )
					src = elements[index].href;

				if(index < 0 || index >= elements.length){
					return false;
				}

				if( !$this.isVideo(src) ){
					$this.loadMedia(src, function(){
						$('#swipebox-slider .slide').eq(index).html(this);
					});
				}else{
					$('#swipebox-slider .slide').eq(index).html($this.getVideo(src));
				}
				
			},

			setTitle : function (index, isFirst){
				var title = null;

				$('#swipebox-caption').empty();

				if( elements[index] !== undefined )
					title = elements[index].title;
				
				if(title){
					$('#swipebox-caption').append(title);
				}
			},

			isVideo : function (src){

				if( src ){
					if( 
						src.match(/youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/) 
						|| src.match(/vimeo\.com\/([0-9]*)/) 
					){
						return true;
					}
				}
					
			},

			getVideo : function(url){
				var iframe = '';
				var output = '';
				var youtubeUrl = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
				var vimeoUrl = url.match(/vimeo\.com\/([0-9]*)/);
				if( youtubeUrl ){

					iframe = '<iframe width="560" height="315" src="//www.youtube.com/embed/'+youtubeUrl[1]+'" frameborder="0" allowfullscreen></iframe>';
				
				}else if(vimeoUrl){

					iframe = '<iframe width="560" height="315"  src="http://player.vimeo.com/video/'+vimeoUrl[1]+'?byline=0&amp;portrait=0&amp;color='+plugin.settings.vimeoColor+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
				
				}

				return '<div class="swipebox-video-container" style="max-width:'+plugin.settings.videomaxWidth+'px"><div class="swipebox-video">'+iframe+'</div></div>';
			},
			
			loadMedia : function (src, callback){
				if( !this.isVideo(src) ){
					var img = $('<img>').on('load', function(){
						callback.call(img);
					});
					
					img.attr('src',src);
				}	
>>>>>>> origin/master
			},
			
			getNext : function (){
				var $this = this;
				index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current'));
<<<<<<< HEAD
				if(index+1 < $elem.length){
					index++;
					$this.setSlide(index);
					$this.preloadImg(index+1);
=======
				if(index+1 < elements.length){
					index++;
					$this.setSlide(index);
					$this.preloadMedia(index+1);
>>>>>>> origin/master
				}
				else{
					
					$('#swipebox-slider').addClass('rightSpring');
					setTimeout(function(){
						$('#swipebox-slider').removeClass('rightSpring');
					},500);
				}
			},
			
			getPrev : function (){
				var $this = this;
				index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current'));
				if(index > 0){
					index--;
					$this.setSlide(index);
<<<<<<< HEAD
					$this.preloadImg(index-1);
=======
					$this.preloadMedia(index-1);
>>>>>>> origin/master
				}
				else{
					
					$('#swipebox-slider').addClass('leftSpring');
					setTimeout(function(){
						$('#swipebox-slider').removeClass('leftSpring');
					},500);
				}
			},


			closeSlide : function (){
				var $this = this;
<<<<<<< HEAD
				$(window).trigger('resize');
				$('html').removeClass('swipebox');
=======
				$('html').removeClass('swipebox');
				$(window).trigger('resize');
>>>>>>> origin/master
				$this.destroy();
			},

			destroy : function(){
				var $this = this;
				$(window).unbind('keyup');
				$('body').unbind('touchstart');
				$('body').unbind('touchmove');
				$('body').unbind('touchend');
				$('#swipebox-slider').unbind();
				$('#swipebox-overlay').remove();
<<<<<<< HEAD
				$elem.removeData('_swipebox');
				$this.target.trigger('swipebox-destroy');
 			}

		}

		plugin.init();
		
	}
=======
				elem.removeData('_swipebox');
				if ( $this.target )
					$this.target.trigger('swipebox-destroy');
				$.swipebox.isOpen = false;
				if (plugin.settings.afterClose) 
					plugin.settings.afterClose();
 			}

		};

		plugin.init();
		
	};
>>>>>>> origin/master

	$.fn.swipebox = function(options){
		if (!$.data(this, "_swipebox")) {
			var swipebox = new $.swipebox(this, options);
			this.data('_swipebox', swipebox);
		}
<<<<<<< HEAD
	}

}(window, document, jQuery));
=======
		return this.data('_swipebox');
	}

}(window, document, jQuery));
>>>>>>> origin/master
