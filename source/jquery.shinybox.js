/*---------------------------------------------------------------------------------------------

@author       Constantin Saguin - @brutaldesign
@link            http://csag.co
@github        http://github.com/One-com/shinybox
@version     1.2.1
@license      MIT License

----------------------------------------------------------------------------------------------*/

(function (window, document, $) {

	$.shinybox = function (elem, options) {

		var defaults = {
			useCSS : true,
			initialIndexOnArray : 0,
			hideBarsDelay : 3000,
			videoMaxWidth : 1140,
			vimeoColor: 'CCCCCC',
			beforeOpen: null,
			afterClose: null,
			closePlacement: 'bottom',
			captionPlacement: 'top',
			navigationPlacement: 'bottom'
		},

		plugin = this,
		elements = [], // slides array [{href:'...', title:'...'}, ...],
		$elem,
		selector = elem.selector,
		$selector = $(selector),
		isTouch = typeof document.createTouch !== 'undefined' || ('ontouchstart' in window) || ('onmsgesturechange' in window) || navigator.msMaxTouchPoints,
		supportSVG = !!(window.SVGSVGElement),
		winWidth = window.innerWidth ? window.innerWidth : $(window).width(),
		winHeight = window.innerHeight ? window.innerHeight : $(window).height(),
		html = '';

		plugin.settings = {};

		plugin.init = function () {

			plugin.settings = $.extend({}, defaults, options);
			var htmlTop = '', htmlBottom = '';
			if (plugin.settings.closePlacement === 'top') {
				htmlTop += '<a id="shinybox-close"></a>';
			} else if (plugin.settings.closePlacement === 'bottom') {
				htmlBottom += '<a id="shinybox-close"></a>';
			}
			if (plugin.settings.captionPlacement === 'top') {
				htmlTop += '<div id="shinybox-caption"></div>';
			} else if (plugin.settings.captionPlacement === 'bottom') {
				htmlBottom += '<div id="shinybox-caption"></div>';
			}
			if (plugin.settings.navigationPlacement === 'top') {
				htmlTop += '<a id="shinybox-prev"></a>' +
					'<a id="shinybox-next"></a>';
			} else if (plugin.settings.navigationPlacement === 'bottom') {
				htmlBottom += '<a id="shinybox-prev"></a>' +
					'<a id="shinybox-next"></a>';
			}
		html = '<div id="shinybox-overlay">' +
			'<div id="shinybox-slider"></div>' +
			'<div id="shinybox-top">' +
			htmlTop +
			'</div>' +
			'<div id="shinybox-bottom">' +
			htmlBottom +
			'</div>' +
			'</div>';

			if ($.isArray(elem)) {

				elements = elem;
				ui.target = $(window);
				ui.init(plugin.settings.initialIndexOnArray);

			} else {

				$selector.click(function (e) {
					elements = [];
					var index, relType, relVal;

					if (!relVal) {
						relType = 'rel';
						relVal  = $(this).attr(relType);
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						$elem = $selector.filter('[' + relType + '="' + relVal + '"]');
					} else {
						$elem = $(selector);
					}

					$elem.each(function () {

						var title = null, href = null;

						if ($(this).attr('title')) {
							title = $(this).attr('title');
						}
						if ($(this).attr('href')) {
							href = $(this).attr('href');
						}
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
		};

		plugin.refresh = function () {
			if (!$.isArray(elem)) {
				ui.destroy();
				$elem = $(selector);
				ui.actions();
			}
		};

		var ui = {

			init : function (index) {
				if (plugin.settings.beforeOpen)
					plugin.settings.beforeOpen();
				this.target.trigger('shinybox-start');
				$.shinybox.isOpen = true;
				this.build();
				this.openSlide(index);
				this.openMedia(index);
				this.preloadMedia(index + 1);
				this.preloadMedia(index - 1);
			},

			build : function () {
				var $this = this;

				$('body').append(html);

				if ($this.doCssTrans()) {
					$('#shinybox-slider').css({
						'-webkit-transition' : 'left 0.4s ease',
						'-moz-transition' : 'left 0.4s ease',
						'-o-transition' : 'left 0.4s ease',
						'-khtml-transition' : 'left 0.4s ease',
						'transition' : 'left 0.4s ease'
					});
					$('#shinybox-overlay').css({
						'-webkit-transition' : 'opacity 1s ease',
						'-moz-transition' : 'opacity 1s ease',
						'-o-transition' : 'opacity 1s ease',
						'-khtml-transition' : 'opacity 1s ease',
						'transition' : 'opacity 1s ease'
					});
					$('#shinybox-bottom, #shinybox-top').css({
						'-webkit-transition' : '0.5s',
						'-moz-transition' : '0.5s',
						'-o-transition' : '0.5s',
						'-khtml-transition' : '0.5s',
						'transition' : '0.5s'
					});
				}


				if (supportSVG) {
					var bg = $('#shinybox-close').css('background-image');
					bg = bg.replace('png', 'svg');
					$('#shinybox-prev,#shinybox-next,#shinybox-close').css({
						'background-image' : bg
					});
				}

				$.each(elements, function () {
					$('#shinybox-slider').append('<div class="slide"></div>');
				});

				$this.setDim();
				$this.actions();
				$this.keyboard();
				$this.gesture();
				$this.animBars();
				$this.resize();

			},

			setDim : function () {

				var width, height, sliderCss = {};

				if ("onorientationchange" in window) {

					window.addEventListener("orientationchange", function () {
						if (window.orientation === 0) {
							width = winWidth;
							height = winHeight;
						} else if (window.orientation == 90 || window.orientation == -90) {
							width = winHeight;
							height = winWidth;
						}
					}, false);
				} else {
					width = window.innerWidth ? window.innerWidth : $(window).width();
					height = window.innerHeight ? window.innerHeight : $(window).height();
				}

				sliderCss = {
					width : width,
					height : height
				};


				$('#shinybox-overlay').css(sliderCss);

			},

			resize : function () {
				var $this = this;

				$(window).resize(function () {
					$this.setDim();
				}).resize();
			},

			supportTransition : function () {
				var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition'.split(' ');
				for (var i = 0; i < prefixes.length; i += 1) {
					if (document.createElement('div').style[prefixes[i]] !== undefined) {
						return prefixes[i];
					}
				}
				return false;
			},

			doCssTrans : function () {
				if (plugin.settings.useCSS && this.supportTransition()) {
					return true;
				}
			},

			gesture : function () {
				if (isTouch) {
					var $this = this,
					distance = null,
					swipMinDistance = 10,
					startCoords = {},
					endCoords = {};
					var bars = $('#shinybox-top, #shinybox-bottom');

					bars.addClass('visible-bars');
					$this.setTimeout();

					$('body').bind('touchstart', function (e) {

						$(this).addClass('touching');

						endCoords = e.originalEvent.targetTouches[0];
						startCoords.pageX = e.originalEvent.targetTouches[0].pageX;

						$('.touching').bind('touchmove', function (e) {
							e.preventDefault();
							e.stopPropagation();
							endCoords = e.originalEvent.targetTouches[0];
						});

						return false;

					}).bind('touchend', function (e) {
						e.preventDefault();
						e.stopPropagation();

						distance = endCoords.pageX - startCoords.pageX;

						if (distance >= swipMinDistance) {

							// swipeLeft
							$this.getPrev();

						} else if (distance <= - swipMinDistance) {

							// swipeRight
							$this.getNext();

						} else {
							// tap
							if (!bars.hasClass('visible-bars')) {
								$this.showBars();
								$this.setTimeout();
							} else {
								$this.clearTimeout();
								$this.hideBars();
							}
						}

						$('.touching').off('touchmove').removeClass('touching');

					});

				}
			},

			setTimeout: function () {
				if (plugin.settings.hideBarsDelay > 0) {
					var $this = this;
					$this.clearTimeout();
					$this.timeout = window.setTimeout(
						function () {
							$this.hideBars();
						},
						plugin.settings.hideBarsDelay
					);
				}
			},

			clearTimeout: function () {
				window.clearTimeout(this.timeout);
				this.timeout = null;
			},

			showBars : function () {
				var bars = $('#shinybox-top, #shinybox-bottom');
				if (this.doCssTrans()) {
					bars.addClass('visible-bars');
				} else {
					$('#shinybox-top').animate({ top : 0 }, 500);
					$('#shinybox-bottom').animate({ bottom : 0 }, 500);
					setTimeout(function () {
						bars.addClass('visible-bars');
					}, 1000);
				}
			},

			hideBars : function () {
				var bars = $('#shinybox-top, #shinybox-bottom');
				if (this.doCssTrans()) {
					bars.removeClass('visible-bars');
				} else {
					$('#shinybox-top').animate({ top : '-50px' }, 500);
					$('#shinybox-bottom').animate({ bottom : '-50px' }, 500);
					setTimeout(function () {
						bars.removeClass('visible-bars');
					}, 1000);
				}
			},

			animBars : function () {
				var $this = this;
				var bars = $('#shinybox-top, #shinybox-bottom');

				bars.addClass('visible-bars');
				$this.setTimeout();

				$('#shinybox-slider').click(function (e) {
					if (!bars.hasClass('visible-bars')) {
						$this.showBars();
						$this.setTimeout();
					}
				});

				$('#shinybox-bottom').hover(
					function () {
						$this.showBars();
						bars.addClass('force-visible-bars');
						$this.clearTimeout();
					},
					function () {
						bars.removeClass('force-visible-bars');
						$this.setTimeout();
					}
				);
			},

			keyboard : function () {
				var $this = this;
				$(window).bind('keyup', function (e) {
					e.preventDefault();
					e.stopPropagation();
					if (e.keyCode === 37) {
						$this.getPrev();
					}
					else if (e.keyCode === 39) {
						$this.getNext();
					}
					else if (e.keyCode === 27) {
						$this.closeSlide();
					}
				});
			},

			actions : function () {
				var $this = this;

				if (elements.length < 2) {
					$('#shinybox-prev, #shinybox-next').hide();
				} else {
					$('#shinybox-prev').bind('click touchend', function (e) {
						e.preventDefault();
						e.stopPropagation();
						$this.getPrev();
						$this.setTimeout();
					});

					$('#shinybox-next').bind('click touchend', function (e) {
						e.preventDefault();
						e.stopPropagation();
						$this.getNext();
						$this.setTimeout();
					});
				}

				$('#shinybox-close').bind('click touchend', function (e) {
					$this.closeSlide();
				});

				$('#shinybox-slider .slide').bind('click', function (e) {
					if (e.target === this) {
						$this.closeSlide();
					}
				});
			},

			setSlide : function (index, isFirst) {
				isFirst = isFirst || false;

				var slider = $('#shinybox-slider');

				if (this.doCssTrans()) {
					slider.css({ left : (-index * 100) + '%' });
				} else {
					slider.animate({ left : (-index * 100) + '%' });
				}

				$('#shinybox-slider .slide').removeClass('current');
				$('#shinybox-slider .slide').eq(index).addClass('current');
				this.setTitle(index);

				if (isFirst) {
					slider.fadeIn();
				}

				$('#shinybox-prev, #shinybox-next').removeClass('disabled');
				if (index === 0) {
					$('#shinybox-prev').addClass('disabled');
				} else if (index === elements.length - 1) {
					$('#shinybox-next').addClass('disabled');
				}
			},

			openSlide : function (index) {
				$('html').addClass('shinybox');
				$(window).trigger('resize'); // fix scroll bar visibility on desktop
				this.setSlide(index, true);
			},

			preloadMedia : function (index) {
				var $this = this, src = null;

				if (elements[index] !== undefined) {
					src = elements[index].href;
				}
				if (!$this.isVideo(src)) {
					setTimeout(function () {
						$this.openMedia(index);
					}, 1000);
				} else {
					$this.openMedia(index);
				}
			},

			openMedia : function (index) {
				var $this = this, src = null;

				if (elements[index] !== undefined) {
					src = elements[index].href;
				}
				if (index < 0 || index >= elements.length) {
					return false;
				}

				if (!$this.isVideo(src)) {
					$this.loadMedia(src, function () {
						$('#shinybox-slider .slide').eq(index).html(this).addClass('loaded');
					});
				} else {
					$('#shinybox-slider .slide').eq(index).html($this.getVideo(src));
				}

			},

			setTitle : function (index, isFirst) {
				var title = null;

				$('#shinybox-caption').empty();

				if (elements[index] !== undefined) {
					title = elements[index].title;
				}
				if (title) {
					$('#shinybox-caption').append(title);
				}
			},

			isVideo : function (src) {
				if (src) {
					if (src.match(/youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/) ||
						src.match(/vimeo\.com\/([0-9]*)/)) {
						return true;
					}
				}

			},

			getVideo : function (url) {
				var iframe = '';
				var output = '';
				var youtubeUrl = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
				var vimeoUrl = url.match(/vimeo\.com\/([0-9]*)/);
				if (youtubeUrl) {
					iframe = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + youtubeUrl[1] + '" frameborder="0" allowfullscreen></iframe>';
				} else if (vimeoUrl) {
					iframe = '<iframe width="560" height="315"  src="http://player.vimeo.com/video/' + vimeoUrl[1] + '?byline=0&amp;portrait=0&amp;color=' + plugin.settings.vimeoColor + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
				}

				return '<div class="shinybox-video-container" style="max-width:' + plugin.settings.videomaxWidth + 'px"><div class="shinybox-video">' + iframe + '</div></div>';
			},

			loadMedia : function (src, callback) {
				if (!this.isVideo(src)) {
					var img = $('<img>').on('load', function () {
						callback.call(img);
					});

					img.attr('src', src);
				}
			},

			getNext : function () {
				var $this = this,
					index = $('#shinybox-slider .slide').index($('#shinybox-slider .slide.current'));
				if (index + 1 < elements.length) {
					index += 1;
					$this.setSlide(index);
					$this.preloadMedia(index + 1);
				} else {

					$('#shinybox-slider').addClass('rightSpring');
					setTimeout(function () {
						$('#shinybox-slider').removeClass('rightSpring');
					}, 500);
				}
			},

			getPrev : function () {
				var index = $('#shinybox-slider .slide').index($('#shinybox-slider .slide.current'));
				if (index > 0) {
					index -= 1;
					this.setSlide(index);
					this.preloadMedia(index - 1);
				} else {
					$('#shinybox-slider').addClass('leftSpring');
					setTimeout(function () {
						$('#shinybox-slider').removeClass('leftSpring');
					}, 500);
				}
			},


			closeSlide : function () {
				$('html').removeClass('shinybox');
				$(window).trigger('resize');
				this.destroy();
			},

			destroy : function () {
				$(window).unbind('keyup');
				$('body').unbind('touchstart');
				$('body').unbind('touchmove');
				$('body').unbind('touchend');
				$('#shinybox-slider').unbind();
				$('#shinybox-overlay').remove();
				if (!$.isArray(elem))
					elem.removeData('_shinybox');
				if (this.target)
					this.target.trigger('shinybox-destroy');
				$.shinybox.isOpen = false;
				if (plugin.settings.afterClose)
					plugin.settings.afterClose();
			}

		};

		plugin.init();

	};

	$.fn.shinybox = function (options) {
		if (!$.data(this, "_shinybox")) {
			var shinybox = new $.shinybox(this, options);
			this.data('_shinybox', shinybox);
		}
		return this.data('_shinybox');
	};

}(window, document, jQuery));
