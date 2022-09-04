

const fs = require('fs');
const readline = require('readline');

// readline interface
const rl = readline.createInterface({
	input: process.stdin,
	terminal: false
});


const nativeDebuglogs = fs.createWriteStream("nativeDebuglogs.txt");

/* ======== Heap Object =========== */
/**
 * @param  {} arr array of elements to populate the heap
 * @param  {Function} priorityCondition callbackfn: (a: number, b: number) => bool
 * 
 * should return true if the first argument has higher priority than the second
 * @author Zane Larking
 */
function Heap(arr, priorityCondition) {
	// set aliases
	Object.defineProperty(this, "length", { get: () => arr.length });
	Object.defineProperty(this, "top", { get: () => arr[0] });
 
	this.priorityCondition = priorityCondition;
	this.arr = arr;
	this.heapify();
}
Heap.prototype.heapify = function () {
	let i = Math.floor(this.length / 2) - 1;
	
	for (i; i >= 0; i--) {
		this.sink(i);
	}
	return this.arr;
}
Heap.prototype.removeTop = function () {
	// swap highest priority element with the last
	this.swap(0,this.length-1);

	// remove the highest priority element from the internal array
	let out = this.arr.pop()//?


	// sink new top to correct order of heap
	this.arr//?
	this.sink(0);
	this.arr//?

	// return the highest priority element
	return out;
}	
Heap.prototype.callFilter = function (i) {
	let parent = this.arr[i];
	let leftChild = this.arr[2 * i + 1];
	let rightChild;//?
	if (this.length >= 2 * i + 2) {
		rightChild = this.arr[2 * i + 2];
	}
	if (this.priorityCondition(parent, leftChild)) {
		// parent is higher priority than leftChild
		if (rightChild == undefined || this.priorityCondition(parent, rightChild)) {
			// parent is higher priority than rightChild
			return 0; // no change required
		}
		else {
			//parent is lower priority than rightChild
			return 1; // sink right
		}
	}
	// parent is lower priority than leftChild
	if (rightChild == undefined || this.priorityCondition(leftChild, rightChild)) {
		// leftChild is higher priority than rightChild AND parent
		return -1; // sink left
	}
	else {
		// rightChild is higher priority than leftChild which is higher priority
		//than parent
		return 1; // sink right
	}
}
Heap.prototype.sink = function (i) {
	i//?
	if (i > Math.floor(this.length / 2) - 1) {
		i//?
		return;

	}
	switch (this.callFilter(i)) {
		case -1: //sink left
			i//?

			this.swap(i, 2 * i + 1);
			this.sink(2 * i + 1);//?
			break;
		case 1: //sink right
			this.swap(i, 2 * i + 2);//?
			this.sink(2 * i + 2);
			break;
		case 0: // don't sink
			i//?
			break;
		default: // error
			break;
	}

}
Heap.prototype.swap = function (i, j) {

	let temp = this.arr[i];
	this.arr[i] = this.arr[j];
	this.arr[j] = temp;

}
Heap.prototype.display = function (key = "") {
	// writes a visualisation of the heap in stdout 
	process.stdout.write('\n');



	let displayValues = this.arr.map((x) => {
		return (x[key] ? x[key] : x);
	}); //?

	// create a parallel array with values coresponding to the lengths of
	// elements to be displayed 
 	let lengths = displayValues.map((x) => { return x.toString(10).length });//?
	// length of the longest element
	let maxlength = lengths.reduce((prev, cur) => Math.max(prev, cur), 0);//?
	// height of the heap
	let height = Math.floor(Math.log2(displayValues.length));//?

	let h = 0;
	let c = 0;
	for (let i = 0; i < displayValues.length; i++) {
		let width = maxlength * Math.pow(2, height - h) + 2 * (Math.pow(2, height - h) - 1);

		// format output
		let strOut = `${displayValues[i]}`
		strOut = strOut.padEnd(width / 2, " ").padStart(width, " ");

		// determine what delimiter to append to output
		c++;
		if (c == Math.pow(2, h)) {
			c = 0;
			h++;
			strOut += `\n`;
		}
		else if (i < displayValues.length - 1) {
			strOut += ', ';
		}

		// write to stdout
		process.stdout.write(strOut);
	}


}

/* ======== Course Object ========= */
function Course(name, duration, lastDay) {
	this.name = name;
	this.duration = duration;
	this.lastDay = lastDay;
}
Course.prototype.toString = function() {
	return `{Course [${this.name}, ${this.duration}, ${this.lastDay}]}`;
}

/**
 * parse csv input into course
 * 
 * inputs:
 * <@code str>: string - comma separated values
 * 
 * [delimiter: string] - optional delimiter value (',' by default)
 * 
 * Author: Zane Larking
 */
function parseCourseCSV(str, delimiter = ",") {


	// get number of rows entries 
	// const rowCount = parseInt(str.slice(str.indexOf('\n')));//?
	
	row = str;
	// split input string by row entries
	// const rows = str.slice(str.indexOf("\n") + 1, str.indexOf("\x00")-1).split("\n");


	// return rows.map((row) => {
		/* Convert each row into a array of Course Objects */


		nativeDebuglogs.write(`row    : ${row}\n`);
		

		// split the row string into course count and array of courses
		let a = row.split(/,\[(?=\[)/)//?
		let entryCount = parseInt(a[0], 10);
		let entries = a[1].substr(0, a[1].length-1)//?

		// captures the details of each course entry (strings)
		let pattern = /\[\D(\w+)\D, (\d+), (\d+)\]/g;
		let values = [...entries.matchAll(pattern)];//?
		
		// parse the values to usable types
		let out = values.map(x => {
			return new Course(x[1], parseInt(x[2],10), parseInt(x[3],10));//?
		})

		nativeDebuglogs.write(`row out: ${out}\n`);

		return out;
	// });//? 

}


function pathCalc(coursesHeap) {
	let numOfCourses = 0;
	let endDate = 0;


	while(coursesHeap.length > 0) {
		coursesHeap//?
		let top = coursesHeap.removeTop();

		if (top.lastDay >= endDate + top.duration) {
			endDate += top.duration;
			numOfCourses ++;
		}
		endDate//?
		numOfCourses//?
		top.lastDay//?
	}

	return `${numOfCourses},${endDate}`;
}

let minValueCondition = (a, b) => {
	// returns a is higher priority if it is less than b
	return (a.lastDay <= b.lastDay);
};

// 	/* debug */
// let input = "2\n4, [['A', 150, 200], ['B', 200, 1400], ['C', 1000, 1200], ['D', 2000, 3100]]\n2, [['A', 100, 200], ['B', 200, 1400]]";

// let rows = parseCourseCSV(input);//?
// for (row of rows) {

// 	let minHeap = new Heap(row, minValueCondition);//?
	
// 	minHeap.top;//?
// 	minHeap.arr;//?
// 	minHeap.display("name");//?
// 	minHeap.display("duration");//?
// 	minHeap.display("lastDay");//?
// 	minHeap.display();//?

// 	pathCalc(minHeap);
	
	
	
// }



rl.on('line', onLine);

var rowHeader;

function onLine(line) {
	// first run short circuit
	if (rowHeader == undefined) {
		rowHeader = line.toString().trim();
		return;
	}
	let row = parseCourseCSV(line.toString().trim().replace("\r", ""));//?
	let heap = new Heap(row, minValueCondition);//?
	let out = pathCalc(heap);

	nativeDebuglogs.write(`row calc: ${out}\n`);

	// output
	process.stdout.write(`${out}\n`);
}


// debug v2
// process.stdin.push("2\n");
// process.stdin.push("4, [['A', 150, 200], ['B', 200, 1400], ['C', 1000, 1200], ['D', 2000, 3100]]\n");
// process.stdin.push("2, [['A', 100, 200], ['B', 200, 1400]]\n");

