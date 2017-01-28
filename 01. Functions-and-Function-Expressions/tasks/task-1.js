/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function solve() {

return function(arr){
	var sum=0,elem;
if(arr.length===0){
return null;
}else if(arr==='undefined'){
		throw "The array cannot be undefined";

}else{
	 for (var i = 0; i < arr.length; i += 1) {
	 elem = Number(arr[i]);
	 
		   if (!Number(elem)) {
			throw "All elements of the array must be valid numbers";
		}
			 sum+=elem;
		
		}
}
	
	return sum;
}
}

console.log(solve(["1", "2"]));
module.exports = solve;
