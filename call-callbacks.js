// Creating our own callback-receiving functions (higher-order functions)
// ---------------------------------------------------------------------------

//  Create a function called firstChar that takes a string and a callback, and "returns" the first character of the string after one second.

//  NOTE: You won't be allowed to use the return keyword, because you'll only be "returning" in the callback to setTimeout, way after your function has finished executing.

//  Create a function called lastChar that takes a string and "returns" the last character of the string after one second.

//  Create a function called getFirstAndLast that takes a string and "returns" the first+last character of the string. Your function should use firstChar and lastChar to do its work. I should be able to call your function like this:

//   getFirstAndLast("hello", function(firstLast) {
//     console.log(firstLast); // should output "ho"
//   });


// Output first char
function firstChar(str, callback) { // the callback is a function that is called in the future
    setTimeout(function() {
        var firstLetter = str.charAt(0);
        callback(firstLetter);
    }, 1000);
}

// firstChar("hello", function(str) {
//     console.log(str);
// });


// Output last char
function lastChar(str, callback) {
    setTimeout(function() {
        var lastLetter = str.slice(-1);
        callback(lastLetter);
    }, 1000);
}

// lastChar("hello", function(str) {
//     console.log(str);
// });


// Output first and last chars
function getFirstAndLast(str, callback) {
    firstChar(str, function(first) {
        lastChar(str, function(last) {
            callback(first+last);
        });
    });
}

getFirstAndLast("hello", function(firstLast) {
    console.log("the result " + firstLast); // should output "ho"
});