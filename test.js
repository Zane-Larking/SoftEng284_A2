let arr = [1,2,3,4,5,6,7,8,9];

let lengths = arr.map((x)=>{return x.toString(10).length});//?

let maxlength = lengths.reduce((prev, cur)=>Math.max(prev,cur), 0);//?

let height = Math.floor(Math.log2(arr.length));//?


let width = Math.pow(2, height) * maxlength +2*(Math.pow(2,height)-2);//?

let widths = [];

let h = 0;
let c = 0;
for (let i = 0; i < arr.length; i++) {
	width = maxlength * Math.pow(2, height - h) + 2 * (Math.pow(2, height - h) - 1)

	let strOut = `${arr[i]}`
	strOut = strOut.padEnd(width / 2, " ").padStart(width, " ");
	c++;
	if (c == Math.pow(2,h)) {
		c=0;
		h++;
		strOut += `\n`;
	}
	else if (i < arr.length-1){
		strOut += ', ';
	}
	process.stdout.write(strOut);
}




// 2 * (2 * (2 * (width) + 2) + 2) +2

// 2^3 * width + 2*2^0 + 2*2^1 + 2*2^2

// let x = 1;
// a= maxlength * Math.pow(2, x) + 2*(Math.pow(2,x)-1)//?