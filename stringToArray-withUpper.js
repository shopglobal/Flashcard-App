var string = "test1" + " " + "test2"; // hard coded, or process.argv
var stringArr = string.split(" "); // for concatenation with space in your args/string
var array = String(stringArr).toUpperCase().split(","); // split string and concatenate with comma


console.log("This is a string: " + string)
console.log("This is an array: " + stringArr);
console.log("This is an array with properties: " + array);
console.log("\n");
console.log(string)
console.log(stringArr);
console.log(array);