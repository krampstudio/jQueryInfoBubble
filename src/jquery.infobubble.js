/**
 * jQuery info bubble plugin
 * Copyright (C) 2012  Bertrand CHEVRIER, KrampStudio
 *  
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see http://www.gnu.org/licenses/agpl-3.0.txt
 * 
 * @author <a href="mailto:chevrier.bertrand@gmail.com">Bertrand Chevrier</a>
 * @license http://www.gnu.org/licenses/agpl-3.0.txt
 * @version $version$
 * @requires jquery >= 1.7
 */
 
(function( $ ){
    "use strict";
    
    var InfoBubble = {
        _opts : {
			content : 'info bubble',							//the content of the bubble, can be html
			position: 'right',									//the position of the bubble relative to the jquery element
			arrow	: {											//the src of imgs used for the arrow
				top		: '../resources/arrow_top.png',
				right	: '../resources/arrow_right.png',
				bottom	: '../resources/arrow_bottom.png',
				left	: '../resources/arrow_left.png'
			},
			style	: {											//bubble extra style
				'background-color' 	: '#000',
				'border'			: 'solid 2px #FFF',
				'color'				: '#FFF',
				'padding'			: '10px',
				'border-radius'		: '6px'
			}
        },
        display: function(options){      
            var opts = $.extend(true, {}, InfoBubble._opts, options);
            return this.each(function() {
                var $elt = $(this);
				var target = $.extend({}, $elt.offset(), {
					width	: parseInt($elt.width()),
					height	: parseInt($elt.height()),
					right	: parseInt($elt.offset().left) + parseInt($elt.width()),
					bottom	: parseInt($elt.offset().top) + parseInt($elt.height())
				});

				var arrow, position = {};
				switch(opts.position) {
					case 'top'		: arrow = opts.arrow.bottom;  break;
					case 'right'	: arrow = opts.arrow.left; break;
					case 'bottom'	: arrow = opts.arrow.top; break;
					case 'left'		: arrow = opts.arrow.right; break;
					default			: $.error('Unkown position ' + opts.position + 'for the info bubble'); break;
				}
				
				//load the arrow to get it's size
				InfoBubble.getImageSize(arrow, function(error, size){
				
					if(error){
						return $.error(error);
					}
					var $bubble = $("<div>"
								+ "	<div class='bubble-container'>"
								+ " 	<img class='bubble-arrow' src='"+arrow+"' />"
								+ "		<div class='bubble-content'></div>"
								+ " </div>"
								+ "</div>");
				
					$('.bubble-content',$bubble).html(opts.content)
											.css(opts.style);
					$bubble.css({
								'position' 	: 'absolute',
								'top'		: '200px',
								'left'		: '200px',
								'z-index'	: '1000'
							 })	
					$('.bubble-container', $bubble).css({'position' : 'relative'});
					$('.bubble-arrow', $bubble).css({
								'position' 	: 'absolute',
								'top'		: '15px',
								'left'		: '0',
								'opacity'	: '0.7',
								'z-index'	: '1500'
							});
					$('.bubble-content',$bubble).css({
                                'position' 	: 'absolute',
								'top'		: '0',
								'left'		: (parseInt(size.width) - 2) + 'px',
								'opacity'	: '0.6',
								'z-index'	: '1000',
								'min-width'	: '200px',
								'min-height': '100px'
                            });
					$('body').append($bubble);
				});
			});
        },
        destroy : function(){
            this.each(function() {
            	var $elt = $(this);
			});
        }
    };

	/**
	 * @param [String] src image source uri
	 * @param [Function] callback as function(error, size);
	 */
	InfoBubble.getImageSize = function(src, callback){
		if(!src){
			callback("Image source required");
		}
		var img = new Image();
		img.onload = function() {
  			callback(null, {width: this.width, height: this.height});
		}
		img.src = src;
	};

    $.fn.infoBubble = function( method ) {        
        return InfoBubble.display.apply( this, arguments );
    };

})( jQuery );
