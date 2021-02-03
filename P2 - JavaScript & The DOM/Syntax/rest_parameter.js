/*
 * Programming Quiz: Using the Rest Parameter (1-5)
 */

// your code goes here

function average(...nums) {
    // Code is meant to return 0 when no variable is passed
    if (nums == 0) {
        return 0;
    }
    let sum = 0;
    for(let num of nums) {
        sum = sum + num;
    }
    sum = sum / nums.length;
    return (sum);
}

console.log(average(2, 6));
console.log(average(2, 3, 3, 5, 7, 10));
console.log(average(7, 1432, 12, 13, 100));
console.log(average());
