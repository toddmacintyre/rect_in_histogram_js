// check tallest in first iteration


// Largest Rectangle in a Histogram

// [1,3,4,3,2,6,3];

var lgRect = function(array) {

	//Check if valid input
	

	//Declare function scope variables
	var max = {sIndex: null, eIndex: null, height: 0, size: 0};
	var position = [{height: 0, index: 0}];
	var tallest = {height: array[0], index: [0]};
	position.pop();


	//Iterate through the histogram array. Array index is x-axis, and corresponding values are y-axis
	var p = 0;
	var pHeight = 0;
	for (let i = 0; i < array.length; i++) {

		if ( array[i] > tallest.height ) {
			tallest.index = [i];
			tallest.height = array[i];
		} else if ( array[i] === tallest.height ) {
			tallest.index.push(i);
		}

		// retrieve position stack shorthand
		if (position.length > 0) {
			p = position[position.length - 1].index;
			pHeight = position[position.length - 1].height
;		} else {
			pHeight = 0;
		}
		

		if (array[i] < pHeight) {
			// If height decreased
			while ( (array[i] < pHeight) && (position.length > 0) ) {
				// Calculate rectangle size
				max = rectSize( p, i - 1, pHeight, max);

				// Remove from stack
				position.pop();

				// retrieve stack
				if ( position.length > 0 ) {
					p = position[position.length - 1].index;
					pHeight = position[position.length - 1].height;
				} else {
					pHeight = 0;
				}
			}

			// If height increased
		} else if ( array[i] > pHeight ) {
			// Capture all steps up to the top of increase and push to stack
			while ( pHeight < array[i] ) {
				pHeight += 1;
				position.push( {index: i, height: pHeight} );
			}
		}

	} //End for loop iteration


	//Check remaing stack after last iteration
	while (position.length != 0) {

		// retrieve stack
		p = position[position.length - 1].index;
		pHeight = position[position.length - 1].height;

		// Calculate rectangle size
		max = rectSize( p, array.length - 1, pHeight, max);

		// Remove from stack
		position.pop();
	}



	console.log("\n---------------------------\nSUMMARY\n---------------------------\n");
	printArray(array);
	printMax(max);
	printTallest(tallest);
	return [max, tallest];
}


var rectSize = function(start, end, height, max) {
	var size = (end - start + 1) * height;
	if (size > max.size) {
		max.sIndex = start;
		max.eIndex = end;
		max.height = height;
		max.size = size;
		// console.log("new max size --- index range: " + max.sIndex + " - " + max.eIndex + ", height: " + max.height + ", size: " + max.size + ".");
		return max;
	}
	return max;
}

var printArray = function(array) {
	console.log( "Array --- " + array.toString() );
}

var printMax = function(max) {
	console.log("Biggest rectangle --- index range: " + max.sIndex + " - " + max.eIndex + ", height: " + max.height + ", size: " + max.size + ".");
}

var printTallest = function(tallest) {
	if (tallest.index.length > 1) {
		tIndexString = "";
		for ( let i = 0; i < tallest.index.length - 1; i++ ) {
			tIndexString += tallest.index[i] + ", ";
		}
		tIndexString += tallest.index[tallest.index.length - 1];
		console.log("Tallest point --- index: " + tIndexString + " - Height: " + tallest.height + ".");
	} else {
		console.log("Tallest point --- index: " + tallest.index[0] + " - Height: " + tallest.height + ".");
	}
}



// histo = [3,2,1,0,1,2,3,4];
// histo = [4,5,4,3,4];
// histo = [7,6,5,4,3,2,1,0];
// histo = [1,3,4,3,2,6,3];
// histo = [0,5,10,7,10,4,6,3,9];
// histo = [3,20,16,0,0,0,30];
// histo = [0,0,0,0,0,0,0];
// histo = [5,5,5,5,5];
// histo = [5];
// histo = [3,3,3,3,3,3,3,2,3,4,6,9,4,6,6,3,2,3,3,3,3,3,3];




