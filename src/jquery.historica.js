// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var currentDate = new Date();
		
		var pluginName = "historica",
			defaults = {
				startYear: 1900,
				endYear: parseInt(currentDate.getFullYear()),
				indicatorInterval: 25,
				showIndicators: true,
				showIntervalYears: true,
				lineClass: 'historica_line',
				intervalIndicatorClass: 'historica_indicator',
				milestoneClass: 'historica_milestone',
				milstoneWrapperClass: 'historica_milestone_wrapper',
				milestones: [
					{ 
						year: 1900,
						milestonedate: "May 24, 1900",
						title: 'Something Happened!',
						description: "All the good in the world came to a halt to wonder at it's creation.",
						imageUrl: "/images/something.jpg"
					},
					{ 
						year: 1909,
						milestonedate: "May 24, 1900",
						title: 'Something Happened!',
						description: "All the good in the world came to a halt to wonder at it's creation.",
						imageUrl: "/images/something.jpg"
					},
					{ 
						year: 1909,
						milestonedate: "May 24, 1900",
						title: 'Something Happened!',
						description: "All the good in the world came to a halt to wonder at it's creation.",
						imageUrl: "/images/something.jpg"
					},
					{ 
						year: 1922,
						milestonedate: "May 24, 1900",
						title: 'Something Happened!',
						description: "All the good in the world came to a halt to wonder at it's creation.",
						imageUrl: "/images/something.jpg"
					},
					{ 
						year: 1925,
						milestonedate: "May 24, 1900",
						title: 'Something Happened!',
						description: "All the good in the world came to a halt to wonder at it's creation.",
						imageUrl: "/images/something.jpg"
					},
					{ 
						year: 1925,
						milestonedate: "May 24, 1900",
						title: 'Something Happened!',
						description: "All the good in the world came to a halt to wonder at it's creation.",
						imageUrl: "/images/something.jpg"
					},
					{ 
						year: 1950,
						milestonedate: "May 24, 1900",
						title: 'Something Happened!',
						description: "All the good in the world came to a halt to wonder at it's creation.",
						imageUrl: "/images/something.jpg"
					},
					{ 
						year: 1982,
						milestonedate: "May 24, 1900",
						title: 'Something Happened!',
						description: "All the good in the world came to a halt to wonder at it's creation.",
						imageUrl: "/images/something.jpg"
					},
					{ 
						year: 1982,
						milestonedate: "May 24, 1900",
						title: 'Something Happened!',
						description: "All the good in the world came to a halt to wonder at it's creation.",
						imageUrl: "/images/something.jpg"
					},
					{ 
						year: 2015,
						milestonedate: "May 24, 1900",
						title: 'Something Happened!',
						description: "All the good in the world came to a halt to wonder at it's creation.",
						imageUrl: "/images/something.jpg"
					}
				]
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this.totalYears = this.settings.endYear - this.settings.startYear;
			this.percentPerYear = 100 / this.totalYears;
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {

				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
				this.draw();
			},
			draw: function(  ) {
				var self = this;
				// setup container div
				$( this.element ).css({'position': 'relative', 'margin': '0 1%'});
				
				// draw the line, start and end markers
				$( this.element ).append('<div class="' + this.settings.lineClass + '"></div>');
				this.intervalMarker( 0, this.settings.showIntervalYears );
				this.intervalMarker( this.totalYears, this.settings.showIntervalYears );
				
				// draw the interval markers
				if (this.settings.showIndicators) {
					for (var x = this.settings.indicatorInterval; x < this.totalYears; x = x + this.settings.indicatorInterval) {
						this.intervalMarker( x, this.settings.showIntervalYears );
					}
				}
				
				// draw the milestones
				$.each(this.settings.milestones, function(index, value) {
					self.milestoneMarker( value.year - self.settings.startYear, index );
				});
				
			},
			
			intervalMarker: function( year, writeYear ) {
				writeYear = (typeof writeYear === 'undefined') ? false : true;
				
				var setLeft = year * this.percentPerYear;
				$( this.element ).append('<div class="' + this.settings.intervalIndicatorClass + '" id="year-ind-' + year + '"></div>');
				$('#year-ind-' + year).css({left: setLeft + "%"});
				if (writeYear) { $('#year-ind-' + year).html( '<p>' + (this.settings.startYear + year)  + '</p>' ); }
			},
			
			milestoneMarker: function( year, index ) {
				if ( ! $( "#milestone-year-" + year ).length ) {
					var setLeft = year * this.percentPerYear;
					$( this.element ).append('<div class="' + this.settings.milstoneWrapperClass + '" id="milestone-year-' + year + '"></div>');
					$( "#milestone-year-" + year ).css({left: setLeft + "%"});
				}
				
				$( "#milestone-year-" + year ).append('<div class="' + this.settings.milestoneClass + '" id="milestone-index-' + index + '">&bull;</div>');
			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );