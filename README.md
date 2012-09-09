jQueryInfoBubble
================

A simple jQuery plugin that helps you to display informatibe bubbles relative to an element.

# Usage #

1. Add jQuery (>=1.7) and the plugin to your header:
~~~~~
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
	<script type="text/javascript" src="/path/to/jquery.infobubble.min.js"></script>	
~~~~~

2. Select the target from which you want to display the bubble and call the ```infoBubble``` method (be sure the targeted element is loaded when calling the method):
~~~~~
	$('#target').infoBubble({
		content	: 'Fixed bubble on top of the target', 
		position: 'top',
		style	: {
			width	: '200px',
			height	: '50px'
		}
	});
~~~~~

## Options ##

Initialisation options:

* **content** [String]: the content to display inside the bubble, can be html 
* **position** [String]: the position of the bubble relative to the target. Now only the following values are supported : `top`, `right`, `bottom`, `left` 
* **display** [Boolean]: display the bubble at initialisation?
* **arrow** [Object]:
 * **arrow.top** [String]: path to the image of the up arrow  
 * **arrow.right** [String]: path to the image of the right arrow
 * **arrow.bottom** [String]: path to the image of the down arrow
 * **arrow.left** [String]: path to the image of the left arrow
* **style** [Object]: extra css style to apply to the bubble 
           
## Methods ##

* **display**: Display a bubble previously initialised with the `display: false` option or that was closed.

`$('#target').infoBubble('display');`

* **close**: Close a bubble. The bubble can be displayed again after.

`$('#target').infoBubble('close');`

* **destroy**: Destroy the bubble.

`$('#target').infoBubble('destroy');`

## Events ##

* **infobubblecreate**: triggered when the bubble elements are inserted to the dom.
* **infobubbledisplay**: triggered each time the bubble is shown.
* **infobubbleclose**: triggered each time the bubble is closed/hidden.
* **infobubbledestroy**: triggered just before the bubble is removed from the dom.

You can attach actions using the usual `bind` method on the target, the html elements that contain the bubble is available into the event's data.

~~~~~~
$('#target').bind('infobubbledisplay', function(event, bubble){
	console.log(bubble);
});
~~~~~~

# Development #

## Build ##

Requires [node.js](http://nodejs.org) and [npm](https://npmjs.org/).

Install [grunt](http://gruntjs.org):

	npm install -g grunt

Build the plugin:

	git clone git@github.com:krampstudio/jQueryInfoBubble.git
	cd jQueryInfoBubble
	grunt

## Tests ##

The unit tests are made with [qunit](http://qunitjs.org/), you can either :
* run the tests from the browser by openning the test files (no web server needed)
* run the tests with grunt (it needs [phantomjs](http://phantomjs.org/) to be installed on your system): `grunt qunit`

# License #

jQuery info bubble plugin
Copyright (C) 2012  Bertrand CHEVRIER, KrampStudio
  
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/> 
