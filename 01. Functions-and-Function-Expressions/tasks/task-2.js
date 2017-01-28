/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

 function findPrimes(start,end) {
		if (arguments.length<2){
			throw 'The array must have at least two numbers.';
		}else if(!isNaN(start) || !Number(end) || start!=0){
			throw "The start and the end poinr must be valid numbers.";
		}else{
			var arr=[];
			start=Number(start);
			end=Number(end);
			for (var i = start; i <= end; i+=1) {
				if(isPrime(i)){
					arr.push(i);
				}
			}
			return arr;
		}
	}
function isPrime(number) {
    var start = 0;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

console.log(findPrimes(0,5));
module.exports = solve;
