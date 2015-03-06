'use strict';

var Stared = function( element ) {
	// select element where to load review stars
	this.element = (typeof element != 'object') ? document.querySelector(element) : element; 
	// set class to container
	this.element.className = 'staredContainer';
}

/*
	Setup reviews and render stars
*/
Stared.prototype.setup = function( settings ) {
	this.maxRate = settings.maxRate;
	this.defaultRate = settings.defaultRate;

	for( var i = 1; i <= settings.maxRate; i++ ) {
		// creating starts
		var reviewElement = document.createElement('div');
		// setting class to starts
		reviewElement.className = 'set-review';
		// statement to check are radio buttons included or not
		if(settings.radio) { this.createRadio(reviewElement, i); }
		reviewElement.id = "review_" + i; // setting id to stars
		// and rendering stars in selected container
		this.element.appendChild(reviewElement);
	}

	// call highlight method on setup, to define
	// how to highlight stars
	this.highlight( settings.highlight );
	// set default rate
	this.setDefaultRate();
}

/*
	defined events and types of star highlighting 
	and on which event to be called
*/
Stared.prototype.highlight = function( type ) {
	// get all stars from selected container
	var stars = this.element.childNodes;
	// check for event
	if(type[1] == 'click') {
		// check for highlight type
		if(type[0] == 'follow') {
			for( var i = 1; i <= (stars.length - 1); i++ ) {
				stars[i].onclick = function() {
					Stared.prototype.resetStars( stars );

					var id = this.id;
					var splitId = id.split("_");

					for(var j = 1; j <= splitId[1]; j++ ) {
						if(stars[j].className.indexOf('active') < 0) {
							stars[j].className += " active";
						}
					}

					this.getElementsByTagName('input')[0].checked = true;

				}

			}
		// check for highlight type
		} else if(type[0] == 'single') {
			for( var i = 1; i <= (stars.length - 1); i++ ) {
				stars[i].onclick = function() {
					Stared.prototype.resetStars( stars );

					var id = this.id;
					var splitId = id.split("_");

					if(stars[splitId[1]].className.indexOf('active') < 0) {
						stars[splitId[1]].className += " active";
					}

					this.getElementsByTagName('input')[0].checked = true;

				}

			}

		}
	// check for event
	} else if(type[1] == 'hover') {
		// check for highlight type
		if(type[0] == 'follow') {
			for( var i = 1; i <= (stars.length - 1); i++ ) {
				stars[i].onmouseover = function() {
					Stared.prototype.resetStars( stars );

					var id = this.id;
					var splitId = id.split("_");

					for(var j = 1; j <= splitId[1]; j++ ) {
						if(stars[j].className.indexOf('active') < 0) {
							stars[j].className += " active";
						}
					}
				}

				stars[i].onclick = function() {
					this.getElementsByTagName('input')[0].checked = true;
				}
			}
		// check for highlight type
		} else if(type[0] == 'single') {
			for( var i = 1; i <= (stars.length - 1); i++ ) {
				stars[i].onmouseover = function() {
					Stared.prototype.resetStars( stars );

					var id = this.id;
					var splitId = id.split("_");

					if(stars[splitId[1]].className.indexOf('active') < 0) {
						stars[splitId[1]].className += " active";
					}
				}

				stars[i].onclick = function() {
					this.getElementsByTagName('input')[0].checked = true;
				}
			}
		}

	}

	this.element.onmouseleave = function() {
		Stared.prototype.resetStars( stars, 'mouseleave' );
	}

}

/*
	reset reviews upon call
*/
Stared.prototype.resetStars = function( elementNode, eventType ) {
	if(typeof eventType == 'undefined') {
		for( var i = 1; i <= (elementNode.length - 1); i++ ) {
			elementNode[i].className = 'set-review';
		}

	} else if(eventType == 'mouseleave') {
		var a = 0;

		for( var i = 1; i <= (elementNode.length - 1); i++ ) {
			var radio = elementNode[i].getElementsByTagName('input')[0];

			if(radio.checked) {
				var id = radio.parentNode.id;
				var splitId = id.split("_");

				this.resetStars( elementNode );		
				a++;

				for(var j = 1; j <= splitId[1]; j++ ) {
					if(elementNode[j].className.indexOf('active') < 0) {
						elementNode[j].className += " active";
					}
				}

			}

			if(!a) { this.resetStars( elementNode ) }
		}
	}

}

/*
	Method is used for creating radio buttons if user submiting review with form
*/
Stared.prototype.createRadio = function( element, value ) {
	var radio = document.createElement('input');
	radio.type = 'radio';
	radio.className = 'hidden';
	radio.name = 'staredReview';
	radio.value = value;

	element.appendChild(radio);
}

/*
	set default on stars on page load
*/
Stared.prototype.setDefaultRate = function() {
	var defRate = 0;
	var stars = this.element.childNodes;

	(this.defaultRate > this.maxRate) ? defRate = this.maxRate : defRate = this.defaultRate;

	for( var i = 1; i <= defRate; i++ ) {
		stars[i].className += " active";
		stars[i].getElementsByTagName('input')[0].checked = true;
	}

}


