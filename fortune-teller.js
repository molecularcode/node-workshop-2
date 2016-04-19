// import my fortune module file
var fortune = require("./library/fortune.js");

//console.log(fortune);

console.log(fortune.getFortune(Math.floor(Math.random() * 10)));