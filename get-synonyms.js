// import my fortune module file
var synonyms = require("./library/synonyms.js");

// > npm install prompt, colors
var prompt = require('prompt');
var colors = require('colors');
prompt.start();

prompt.get([{name:'word', description:"Enter a word to search for its synonyms"}], function (err, result) {
    var word = result.word.toLowerCase().replace(/ /g, "%20"); // convert to lowercase and replace spaces
    var search = new synonyms.SynonymAPI();
    search.getSynonyms(word, function(result) {
        for(var prop in result){
            if (result.hasOwnProperty(prop)) {
                console.log("Synonyms of the ".red + prop.red + " " + word.red + ":\n" + result[prop].syn.join("\n"));
                //console.log(result);
            }
        }
    });
});