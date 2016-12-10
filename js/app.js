// Largest Rectangle in a Histogram

// [1,3,4,3,2,6,3];

var lgRect = function(array) {

	//Declare function scope variables
	var max = {sIndex: null, eIndex: null, height: 0, size: 0};
	var position = [{index: 0, height: array[0]}];
	var tallest = {height: 0, index: [null]};

	//Iterate through the histogram array. Array index is x-axis, and corresponding values are y-axis
	for (let i = 1; i < array.length; i++) {


		// retrieve position stack shorthand
		p = position[position.length - 1].index;
		pHeight = position[position.length - 1].height;


		// If height decreased
		var flagg = false;
		while (flagg === false) {
			if ( array[i] < pHeight ) {
				
				// Calculate rectangle size
				max = rectSize( p, i, pHeight, max);

				// Remove from stack
				position.pop();

				// retrieve stack
				p = position[position.length - 1].index;
				pHeight = position[position.length - 1].height;

			} else {
				flagg = true;
				continue;
			}
		}


		// If height increased
		if ( array[i] > pHeight ) {
			// Capture all steps up to the top of increase and push to stack
			while ( pHeight < array[i] ) {
				pHeight += 1;
				position.push( {index: i, height: pHeight} );
			}
			
			//Check for tallest
			if ( array[i] > tallest.height ) {
				tallest.index = [i];
				tallest.height = array[i];
			} else if ( array[i] === tallest.height ) {
				tallest.index.push(i);
			}
			continue;
		}


		// If height stayed the same
		if ( array[i] === pHeight ) {
			//Check for tallest
			if ( array[i] === tallest.height ) {
				tallest.index.push(i);
			}
			continue;
		}


		//If last iteration, check remaing stack and check for tallest.
		//Check for tallest
		if (i === array.length - 1) {
			if ( array[i] > tallest.height ) {
				tallest.index = [i];
				tallest.height = array[i];
			} else if ( array[i] === tallest.height ) {
				tallest.index.push(i);
			}

			while (position.length != 0) {

				// Calculate rectangle size
				max = rectSize( p, i + 1, pHeight, max);

				// Remove from stack
				position.pop();

				// retrieve stack
				if (position.length != 0) {
					p = position[position.length - 1].index;
					pHeight = position[position.length - 1].height;
				}
			}
			continue;
		}


	} //End for loop iteration

	console.log("\n---------------------------\nSUMMARY\n---------------------------\n");
	printArray(array);
	printMax(max);
	printTallest(tallest);
	return max
}

var rectSize = function(start, end, height, max) {
	var size = (end - start) * height;
	if (size > max.size) {
		max.sIndex = start;
		max.eIndex = end - 1;
		max.height = height;
		max.size = size;
		console.log("new max size --- index range: " + max.sIndex + " - " + max.eIndex + ", height: " + max.height + ", size: " + max.size + ".");
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


// rect = [1,3,4,3,2,6,3];
rect = [0,5,10,7,10,4,6,3,9,0];
maxRect = lgRect(rect);

