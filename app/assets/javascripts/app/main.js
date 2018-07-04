(function (root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof module === 'object' && typeof exports !== 'undefined') {
		module.exports = factory();
	} else {
		root.mudhead = factory();
	}
}(this, function () {
	'use strict';
	var global = (function () {
		if (typeof self !== 'undefined') {
			return self;
		}
		if (typeof window !== 'undefined') {
			return window;
		}
		if (typeof global !== 'undefined') {
			return global;
		}
		return {};
	})();

	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	};

	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this,
				args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	function createRandIntOrderedArray(minVal, maxVal, size) {
		var arr = [];
		for (var i = 0; i < size; ++i) {
			arr.push(anime.random(minVal, maxVal));
		}
		arr.sort(function (a, b) {
			return a - b
		});
		return arr;
	};

	function isObjEmpty(obj) {
		return Object.getOwnPropertyNames(obj).length > 0;
	};

	function collect() {
		var ret = {};
		var len = arguments.length;
		for (var i = 0; i < len; i++) {
			for (var p in arguments[i]) {
				if (arguments[i].hasOwnProperty(p)) {
					ret[p] = arguments[i][p];
				}
			}
		}
		return ret;
	};

	function areClipPathShapesSupported() {
		var base = 'clipPath',
			prefixes = ['webkit', 'moz', 'ms', 'o'],
			properties = [base],
			testElement = document.createElement('testelement'),
			attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';
		for (var i = 0, l = prefixes.length; i < l; i++) {
			var prefixedProperty = prefixes[i] + base.charAt(0).toUpperCase() + base.slice(1); // remember to capitalize!
			properties.push(prefixedProperty);
		}
		for (var i = 0, l = properties.length; i < l; i++) {
			var property = properties[i];
			if (testElement.style[property] === '') {
				testElement.style[property] = attribute;
				if (testElement.style[property] !== '') {
					return true;
				}
			}
		}
		return false;
	};

	function Segmenter(el, options) {
		this.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		var self = this;
		imagesLoaded(this.el, {
			background: true
		}, function () {
			self._init();
			self._initEvents();
			self.options.onReady();
		});
	};
	Segmenter.prototype.options = {
		pieces: 4,
		renderOnLoad: false,
		shadows: true,
		shadowsAnimation: {
			opacity: 1,
		},
		parallax: false,
		parallaxMovement: {
			min: 10,
			max: 40
		},
		animation: {
			duration: 1500,
			easing: 'easeOutQuad',
			delay: 0,
			translateZ: {
				min: 10,
				max: 65
			},
		},
		onReady: function () {
			return false;
		},
		onAnimationComplete: function () {
			return false;
		},
		onAnimationStart: function () {
			return false;
		},
		positions: [{
				top: 80,
				left: 10,
				width: 30,
				height: 20
			},
			{
				top: 2,
				left: 2,
				width: 40,
				height: 40
			},
			{
				top: 30,
				left: 60,
				width: 30,
				height: 60
			},
			{
				top: 10,
				left: 20,
				width: 50,
				height: 60
			}
		]
	};
	Segmenter.prototype._init = function () {
		this.dimensions = {
			width: this.el.offsetWidth,
			height: this.el.offsetHeight
		};
		var background = this.el.style.backgroundImage;
		this.imgsrc = background.replace('url(', '').replace(')', '').replace(/\"/gi, "");;
		this._layout();
		var self = this;
		this.pieces = [].slice.call(this.el.querySelectorAll('.segmenter__piece-wrap'));
		this.pieces.forEach(function (piece, pos) {
			piece.style.WebkitTransform = piece.style.transform = 'translateZ(0.0001px)';
			if (self.options.renderOnLoad) {
				self._renderPiece(piece);
			}
		});
		if (this.options.renderOnLoad) {
			this.active = true;
		}
	};
	Segmenter.prototype._layout = function () {
		var clipPath = areClipPathShapesSupported();
		var segBgEl = document.createElement('div');
		segBgEl.className = 'segmenter__background';
		segBgEl.style.backgroundImage = 'url(' + this.imgsrc + ')';
		var segPieces = document.createElement('div'),
			segPiecesHTML = '',
			positionsTotal = this.options.positions.length;
		segPieces.className = 'segmenter__pieces';
		for (var i = 0, len = this.options.pieces; i < len; ++i) {
			if (this.options.parallax) {
				segPiecesHTML += '<div class="segmenter__piece-parallax">';
			}
			segPiecesHTML += '<div class="segmenter__piece-wrap">';
			var top, left, width, height, clipTop, clipLeft, clipRight, clipBottom,
				pos = i <= positionsTotal - 1 ? i : 0,
				isRandom = this.options.positions === 'random';
			top = isRandom ? anime.random(0, 100) : this.options.positions[pos].top;
			left = isRandom ? anime.random(0, 100) : this.options.positions[pos].left;
			width = isRandom ? anime.random(0, 100) : this.options.positions[pos].width;
			height = isRandom ? anime.random(0, 100) : this.options.positions[pos].height;
			if (!clipPath) {
				clipTop = isRandom ? top / 100 * this.dimensions.height : this.options.positions[pos].top / 100 * this.dimensions.height;
				clipLeft = isRandom ? left / 100 * this.dimensions.width : this.options.positions[pos].left / 100 * this.dimensions.width;
				clipRight = isRandom ? width / 100 * this.dimensions.width + clipLeft : this.options.positions[pos].width / 100 * this.dimensions.width + clipLeft;
				clipBottom = isRandom ? height / 100 * this.dimensions.height + clipTop : this.options.positions[pos].height / 100 * this.dimensions.height + clipTop;
			}
			if (this.options.shadows) {
				segPiecesHTML += '<div class="segmenter__shadow" style="top: ' + top + '%; left: ' + left + '%; width: ' + width + '%; height: ' + height + '%"></div>';
			}
			segPiecesHTML += clipPath ?
				'<div class="segmenter__piece" style="background-image: url(' + this.imgsrc + '); -webkit-clip-path: polygon(' + left + '% ' + top + '%, ' + (left + width) + '% ' + top + '%, ' + (left + width) + '% ' + (top + height) + '%, ' + left + '% ' + (top + height) + '%); clip-path: polygon(' + left + '% ' + top + '%, ' + (left + width) + '% ' + top + '%, ' + (left + width) + '% ' + (top + height) + '%, ' + left + '% ' + (top + height) + '%)"></div>' :
				'<div class="segmenter__piece" style="background-image: url(' + this.imgsrc + '); clip: rect(' + clipTop + 'px,' + clipRight + 'px,' + clipBottom + 'px,' + clipLeft + 'px)"></div>';
			segPiecesHTML += '</div>'
			if (this.options.parallax) {
				segPiecesHTML += '</div>';
			}
		}
		segPieces.innerHTML = segPiecesHTML;
		this.el.innerHTML = '';
		this.el.appendChild(segBgEl);
		this.el.appendChild(segPieces);
	};

	function _init () {
		var s_nav = $('.sidenav');
		if (s_nav.length !== 0) {
			if (typeof s_nav[0].M_Sidenav !== 'object') {
				s_nav.sidenav({
					onOpenStart: function () {
						$('header.navbar-fixed')
							.first()
							.addClass('side-showing');
					},
					onCloseStart: function () {
						$('header.navbar-fixed')
							.first()
							.removeClass('side-showing');
					}
				});
			}
		}
		if ($('.collapsible').length !==0) {
			$('.collapsible').collapsible({
				accordion: true
			});
		}
		if ($('.dropdown-trigger').length !==0) {
			$('.dropdown-trigger').dropdown({
				alignment: 'right',
				constrainWidth: false,
				coverTrigger: false,
				closeOnClick: false,
				onCloseEnd: function (d) {
					console.log(d);
				}
			});
		}
	};

	var mudhead = {};
	mudhead.Segmenter = Segmenter;
	if (global.jQuery) {
		var $ = global.jQuery;
		$.fn.mud = function (options) {
			var config = options.config || {};
			return this;
		}
		_init();
	}
	return mudhead;
}));
