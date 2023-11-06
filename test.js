var path = require('path');
var app = require(path.resolve('./index'));

app.init(function() {
    console.log('Initialized test automation');
});