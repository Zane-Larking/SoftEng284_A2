// stdin interface for reading one line at a time
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	terminal: false
});

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
	var i = Math.floor(this.length / 2) - 1;
	
	for (i; i >= 0; i--) {
		this.sink(i);
	}
	return this.arr;
}
Heap.prototype.removeTop = function () {
	// swap highest priority element with the last
	this.swap(0,this.length-1);

	// remove the highest priority element from the internal array
	var top = this.arr.pop()


	// sink new top to correct order of heap
	this.arr
	this.sink(0);
	this.arr

	// return the highest priority element
	return top;
}	
Heap.prototype.callFilter = function (i) {
	var parent = this.arr[i];
	var leftChild = this.arr[2 * i + 1];
	var rightChild;
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
	i
	if (i > Math.floor(this.length / 2) - 1) {
		i
		return;

	}
	switch (this.callFilter(i)) {
		case -1: //sink left
			i

			this.swap(i, 2 * i + 1);
			this.sink(2 * i + 1);
			break;
		case 1: //sink right
			this.swap(i, 2 * i + 2);
			this.sink(2 * i + 2);
			break;
		case 0: // don't sink
			i
			break;
		default: // error
			break;
	}

}
Heap.prototype.swap = function (i, j) {

	var temp = this.arr[i];
	this.arr[i] = this.arr[j];
	this.arr[j] = temp;

}
Heap.prototype.add = function (element, deferHeapify = false) {
	//differs from insert by ways of allowing heapiication to be deferred

	// insert element at the end of the heap.
	this.arr.push(element);
	
	// fixing ordering is costly so further control over is provided for
	// defering heapification until order is actually needed. 
	if (!deferHeapify) {
		this.heapify();
	}
}
Heap.prototype.isEmpty = function () {
	return this.length == 0;
}
Heap.prototype.display = function (key = "") {
	// writes a visualisation of the heap in stdout 
	var buffer = "\n"

	// select from full string representation or individual elements
	var displayValues = this.arr.map((x) => {
		return (x[key] ? x[key] : x);
	}); 

	// create a parallel array with values coresponding to the lengths of
	// elements to be displayed 
 	var lengths = displayValues.map((x) => { return x.toString(10).length });
	// length of the longest element
	var maxlength = lengths.reduce((prev, cur) => Math.max(prev, cur), 0);
	// height of the heap
	var height = Math.floor(Math.log2(displayValues.length));

	var h = 0;
	var c = 0;
	for (var i = 0; i < displayValues.length; i++) {
		var width = maxlength * Math.pow(2, height - h) + 2 * (Math.pow(2, height - h) - 1);

		// format string representation of each course object 
		var courseRepr = `${displayValues[i]}`
		courseRepr = courseRepr.padEnd(width / 2, " ").padStart(width, " ");

		// determine what delimiter to append to output
		c++;
		if (c == Math.pow(2, h)) {
			c = 0;
			h++;
			courseRepr += `\n`;
		}
		else if (i < displayValues.length - 1) {
			courseRepr += ', ';
		}

		// write to stdout
		buffer += courseRepr;
	}
	buffer += "\n";
	return buffer;
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
function parseCourseCSV(row, delimiter = ",") {

	// split the row string into entry count and array of entries (courses)
	var a = row.split(new RegExp(`${delimiter}\\\[(?=\\\[)`))
	var _entryCount = parseInt(a[0], 10); // entryCount is unused outside of debugging
	var entries = a[1].substr(0, a[1].length-1);

	// captures the details of each course entry (strings)
	var pattern = /\[\D(\w+)\D, (\d+), (\d+)\]/g;
	var values = [...entries.matchAll(pattern)];

	// parse the values to usable types
	return values.map(x => {
		return new Course(x[1], parseInt(x[2],10), parseInt(x[3],10));
	});
}
/**
 * Returns true is Course a is higher priority; if a.duration is greater than or
 * equal to b.duration 
 * 
 * @param  {Course} a Course object whose ordering is being audited
 * @param  {Course} b Course object to check against 
 * @author Zane Larking
 */
var maxDurationCondition = (a, b) => {
	return (a.duration >= b.duration);
};

/**
 * Returns true is Course a is higher priority; if a.lastDay is less than or
 * equal to b.lastDay
 * 
 * @param  {Course} a Course object whose ordering is being audited
 * @param  {Course} b Course object to check against 
 * @author Zane Larking
 */
var minLastDayCondition = (a, b) => {
	return (a.lastDay <= b.lastDay);
};

/**
 * Calculates the longest course path with the shortest duration
 * 
 * @param  {} coursesHeap Heap of Course objects
 */
function pathCalc(coursesHeap) {
	var numOfCourses = 0;
	var endDate = 0;

	// create a Max Heap to store courses in order of the most negatively
	// impactful (longest) duration.
	var takenCourses = new Heap([], maxDurationCondition);

	// add courses in order of their lastDay property
	while(coursesHeap.length > 0) {
		var curCourse = coursesHeap.removeTop();

		// ensures a course can be compvared before it's lastDay
		if (curCourse.lastDay >= endDate + curCourse.duration) {
			endDate += curCourse.duration;
			takenCourses.add(curCourse, true);
			numOfCourses++;
		}

		// if a course cannot be compvared before its lastDay check if its
		// duration is shorter than another already taken course and swap them
		// if they are
		else if (!takenCourses.isEmpty()) {
			// takenCourse has not been heapified with each _.add call
			takenCourses.heapify();
			if (takenCourses.top.duration > curCourse.duration) {
				endDate += curCourse.duration - takenCourses.removeTop().duration;
				takenCourses.add(curCourse, true);
			}
		}

	}

	// output row entry
	return `${numOfCourses},${endDate}`;
}

/* ============== Main ================ */


// listen for line read events and execute callback
rl.on('line', onLine);

var rowHeader;

/**
 * callback function for a 'readline' 'on-line' event.
 * 
 * @param  {} line input buffer (provided by eventlistener)
 */
function onLine(line) {
	// first run short circuit to skip the header (m)
	// row and course counts go unused in favour of using regex.
	if (rowHeader == undefined) {
		rowHeader = line.toString().trim();
		return;
	}

	// parse 
	var row = parseCourseCSV(line.toString().trim().replace("\r", ""));
	var heap = new Heap(row, minLastDayCondition);
	var out = pathCalc(heap);

	// output
	process.stdout.write(`${out}\n`);
}
