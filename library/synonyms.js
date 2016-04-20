function SynonymAPI() {
    this.apikey = "eca4f1a0b20f42729db701a6a6f8be88";
}

SynonymAPI.prototype = {
    getSynonyms: function(word, callback) {
        var request = require('request');
        var thesaurusAPI = "http://words.bighugelabs.com/api/2/" + this.apikey + "/" + word + "/json";
        request(thesaurusAPI, function(err, result) {
            var resultObject = JSON.parse(result.body);
            callback(resultObject);
        }); 
    }
};

module.exports = {
    SynonymAPI: SynonymAPI
};