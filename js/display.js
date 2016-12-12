//Remove color class when text input is clicked
//Make the code do something on line 28 validator

//Start with alert hidden;
$('.alert').hide();
$('.alert').removeAttr('hidden');

//Add listener to close alert popup
$('.close').click(function() {
   $('.alert').hide();
})


//Clicking triggers histogram calculation
$( '#jsDisplay #histoBtn' ).click( function( event ) {
  event.preventDefault();


  //Hide alert box
  console.log('hiding');
  $('.alert').hide();


  //Get DOM elements
  histogram = document.getElementById('histogram');
  results = document.getElementById('results');


  //Clear results div and histogram div.
  while (results.hasChildNodes()) {
    results.removeChild(results.lastChild);
	}
	while (histogram.hasChildNodes()) {
    histogram.removeChild(histogram.lastChild);
	}


	//Parse input field value into acceptable histogram array
	//Get histogram input as string
	histo = $('#histoInput').val();


	//Check if input is valid
	//Set regex
	var re = /(\d+,)*\d+$/g;
	//If there is any sort of match
	if ( histo.match(re) ) {
		//See if match is on entire string
		if ( histo === histo.match(re).join('') ) {
			//Turn string back into array of numbers
			histo = histo.split(',').map(Number);

			//If only partial match, then invalid input
		} else {
			$('.alert').show();
			return null;
		}
		//Else, invalid input.
	} else {
		$('.alert').show();
		return null;
	}



	//Call lgRect function and feed results to variables
	rectReturn = lgRect(histo);
	maxRect = rectReturn[0];
	tallest = rectReturn[1].height;


	//Create result header element
	var header = document.createElement('h2');
	header.innerHTML = "Results of Max Rectangle: ";


	//Create result content element
	var content = document.createElement('p');
	var contentHTML = "Range: index " + maxRect.sIndex + "-" + maxRect.eIndex + "<br>";
	contentHTML += "Height: " + maxRect.height + "<br>";
	contentHTML += "Area: " + maxRect.size;
	content.innerHTML = contentHTML;


	//Append header and content
	results.appendChild(header);
	results.appendChild(content);




	//Get tallest height for histogram display
	for (let i = 0; i < histo.length; i++) {
		var height;
		var bar = document.createElement('div');
		if (tallest === 0) {
			height = 0;
		} else {
			height = histo[i] / tallest * 100; //As a percentage of tallest bar //When tallest is zero, we get NAN because divide by zero	
		}
		
		//Set height and width for each div element and append.
		var width = 1.0 / histo.length * 93;
		bar.setAttribute('style', "height: " + height + "%; width: " + width + "%");
		bar.innerHTML = histo[i];
		histogram.appendChild(bar);
	}


	//Get


});

