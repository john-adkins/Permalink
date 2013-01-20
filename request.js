
var requestMod = require('request');
requestMod('http://www.google.com', function (e, r, b) {
  if (!e && r.statusCode == 200) {
    console.log(b) // Print the google web page.
  }
})