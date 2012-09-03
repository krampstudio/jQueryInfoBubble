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
			display	: true,
			position: 'right',									//the position of the bubble relative to the jquery element
			opacity : 0.6,
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
		bubble : null,
        init: function(options){
            var opts = $.extend(true, {}, InfoBubble._opts, options);
            return this.each(function() {
                var $elt = $(this);
				var target = {
					width	: $elt.outerWidth(),
					height	: $elt.outerHeight(),
					top		: parseInt($elt.offset().top),
					left	: parseInt($elt.offset().left),
					right	: parseInt($elt.offset().left) + $elt.outerWidth(),
					bottom	: parseInt($elt.offset().top) + $elt.outerHeight()
				};

				var arrow = {}, 
					position = {};
				switch(opts.position) {
					case 'top'		: arrow.src = opts.arrow.bottom; break;
					case 'right'	: arrow.src = opts.arrow.left; break;
					case 'bottom'	: arrow.src = opts.arrow.top; break;
					case 'left'		: arrow.src = opts.arrow.right; break;
					default			: $.error('Unkown position ' + opts.position + 'for the info bubble'); break;
				}
				
				//load the arrow to get it's size
				InfoBubble.getImageSize(arrow.src, function(error, size){
				
					if(error){
						return $.error(error);
					}
					$.extend(arrow, {
						pos : {
							width	: parseInt(size.width),
							height	: parseInt(size.height)
						}
					});

					var $bubble = $("<div>"
								+ "	<div class='bubble-container'>"
								+ " 	<img class='bubble-arrow' src='"+arrow.src+"' />"
								+ "		<div class='bubble-content'></div>"
								+ " </div>"
								+ "</div>");
				
					$('.bubble-content',$bubble).html(opts.content)
											.css(opts.style);
					$bubble.css({
								'position' 	: 'absolute',
								'z-index'	: '1000',
								'visibility': 'hidden'
							 });
					$('.bubble-container', $bubble).css({'position' : 'relative'});
                    $('.bubble-arrow', $bubble).css({
                                'position'  : 'absolute',
                                'opacity'   :  opts.opacity + 0.1,
                                'z-index'   : '1500'
                            });
                    $('.bubble-content',$bubble).css({
                                'position'  : 'absolute',
                                'top'       : '0',
                                'left'      : (parseInt(size.width) - 2) + 'px',
                                'opacity'   : opts.opacity,
                                'z-index'   : '1000',
                                'min-width' : ((parseInt(size.width) * 2) + 5) +'px',
                                'min-height': ((parseInt(size.height) * 2) + 5) +'px'
                            });
					//add it first invisible to calculate the content size
					$('body').append($bubble);

					var arrowHLag = (($('.bubble-content',$bubble).outerHeight() - $('.bubble-content',$bubble).innerHeight())/2),
						arrowVLag = (($('.bubble-content',$bubble).outerWidth() - $('.bubble-content',$bubble).innerWidth())/2) 
					switch(opts.position) {
                   		case 'top'      :
                        	arrow.pos.top = $('.bubble-content',$bubble).outerHeight() - arrowHLag;
							arrow.pos.left = ($('.bubble-content',$bubble).outerWidth() + arrow.pos.width) / 2;
                        	position.top = target.top - $('.bubble-content',$bubble).outerHeight() - arrow.pos.height;
                       		position.left = target.left + (target.width / 2) - $('.bubble-content',$bubble).outerWidth();
                        	break;
                    	case 'right'    : 
							arrow.pos.top = ($('.bubble-content',$bubble).outerHeight() - arrow.pos.height) / 2;
                            arrow.pos.left = 0;
                            position.top = target.top + (target.height / 2 );
                            position.left = target.right;
							break;
                    	case 'bottom'   : 
							arrow.pos.top = arrowHLag - arrow.pos.height;
                            arrow.pos.left = ($('.bubble-content',$bubble).outerWidth() + arrow.pos.width) / 2;
                            position.top = target.bottom + arrow.pos.height;
                            position.left = target.left + (target.width / 2) - $('.bubble-content',$bubble).outerWidth();
							break;
                    	case 'left'     : 
							arrow.pos.top = ($('.bubble-content',$bubble).outerHeight() - arrow.pos.height) / 2;
                            arrow.pos.left = $('.bubble-content',$bubble).innerWidth() + arrow.pos.width;
                            position.top = target.top + (target.height / 2 );
                            position.left = target.left - $('.bubble-content',$bubble).outerWidth() - arrow.pos.width - arrowHLag;
							break;
                	}
					var card;
					for(card in position){
						$bubble.css(card, position[card] + 'px');
					}
					for(card in arrow.pos){
						$('.bubble-arrow', $bubble).css(card, arrow.pos[card] + 'px');
					}
					$bubble.css({
							'display': 'none',
							'visibility' : 'visible' 
							});

					//bind the bubble reference to the target
					$elt.data('infobubble', $bubble);
					//trigger the event `infobubblecreate` 
					$elt.trigger('infobubblecreate', $bubble);					

					if(opts.display){
						$elt.infoBubble('display');
					}
				});
			});
        },
		display : function(){
			this.each(function() {
                var $elt = $(this);
                if($elt.data('infobubble')){
                    var $bubble = $elt.data('infobubble');
					$bubble.show('slow', function(){
						//trigger the `infobubbledisplay` event 
						$elt.trigger('infobubbledisplay', $bubble);
					});
                }
            });
		},
		close : function(){
			this.each(function() {
                var $elt = $(this);
                if($elt.data('infobubble')){
					var $bubble = $elt.data('infobubble');
                    $bubble.hide('slow', function(){
                        //trigger the `infobubbleclose` event 
                        $elt.trigger('infobubbleclose', $bubble);
                    });
                }
            });
		},
        destroy : function(){
            this.each(function() {
            	var $elt = $(this);
				if($elt.data('infobubble')){
					var $bubble = $elt.data('infobubble');
					//trigger the `infobubbleclose` event 
                    $elt.trigger('infobubbledestroy', $bubble);
					$bubble.remove();
				}
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
        if ( InfoBubble[method] ) {
          return InfoBubble[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return InfoBubble.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.infoBubble' );
        }
    };

})( jQuery );
