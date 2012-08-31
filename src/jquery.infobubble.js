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
 */
 
(function( $ ){
    "use strict";
    
    var InfoBubble = {
        _opts : {
			content : '',
			arrow	: {
				top		: '/imgs/infobubble/arrow_top.png',
				right	: '/imgs/infobubble/arrow_right.png',
				bottom	: '/imgs/infobubble/arrow_bottom.png',
				left	: '/imgs/infobubble/arrow_left.png'
			},
			style	: {
				'background-color' 	: '#000',
				'border'			: 'solid 2px #FFF',
		//		'opacity'			: '0.6',
				'color'				: '#FFF',
				'padding'			: '10px',
				'border-radius'		: '6px'
			}
        },
        display: function(options){      
            var opts = $.extend(true, {}, InfoBubble._opts, options);
            return this.each(function() {
                var $elt = $(this);
				
				var $bubble = $("<div>"
								+ "	<div class='bubble-container'>"
								+ " 	<img class='bubble-arrow' src='"+opts.arrow.left+"' />"
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
								'z-index'	: '1500'
							});
				$('.bubble-content',$bubble).css({
                                'position' 	: 'absolute',
								'top'		: '0',
								'left'		: '13px',
								'z-index'	: '1000',
								'width'		: '300px',
								'height'	: '150px'
                            });

					
				$('body').append($bubble);
			});
        },
        destroy : function(){
            this.each(function() {
            	var $elt = $(this);
			});
        }
    };

    $.fn.infoBubble = function( method ) {        
        if ( InfoBubble[method] ) {
          return InfoBubble[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return InfoBubble.display.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.infoBubble' );
        }    
    };

})( jQuery );
