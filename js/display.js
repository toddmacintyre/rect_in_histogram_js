console.log('loading: display.js');
console.log(histo);

$jsDisplay = $('#jsDisplay');

var header = document.createElement('h2');
header.innerHTML = "Results of Max Rectangle: ";

var content = document.createElement('p');
var contentHTML = "Range: index " + maxRect.sIndex + "-" + maxRect.eIndex + "<br>";
contentHTML += "Height: " + maxRect.height + "<br>";
contentHTML += "Area: " + maxRect.size;
content.innerHTML = contentHTML;

$('#results').append(header);
$('#results').append(content);





histogram = document.getElementById('histogram');
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




//Add a multiplier to the tallest, and derive each div height as a percentage of adjusted amount.