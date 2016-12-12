//Remove color class when text input is clicked


$( '#jsDisplay #histoBtn' ).click( function( event ) {
  event.preventDefault();


  //Get DOM elements
  histogram = document.getElementById('histogram');
  results = document.getElementById('results');


  //Clear results and histogram div.
  while (results.hasChildNodes()) {
    results.removeChild(results.lastChild);
	}
	while (histogram.hasChildNodes()) {
    histogram.removeChild(histogram.lastChild);
	}


	//Parse input field value into acceptable histogram array
	histo = $('#histoInput').val().split(',').map(Number);

	//Check if input is valid

	//If valid, turn input green

	//Else, turn input red and break



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




	
	for (let i = 0; i < histo.length; i++) {
		var height;
		var bar = document.createElement('div');
		if (tallest === 0) {
			height = 0;
		} else {
			height = histo[i] / tallest * 100; //As a percentage of tallest bar //When tallest is zero, we get NAN because divide by zero	
		}
		
		var width = 1.0 / histo.length * 93;
		bar.setAttribute('style', "height: " + height + "%; width: " + width + "%");
		bar.innerHTML = histo[i];
		histogram.appendChild(bar);
	}



});

