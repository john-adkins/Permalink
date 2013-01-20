
var http = require('http');
http.createServer(function (request, response) {
    
    var nodeStatic = require('node-static');
    var fileServer = new nodeStatic.Server();
    
    //response.writeHead(200, {'Content-Type': 'text/html'});

//    parseUrl(req.url);

    //var urlParser = require('url');
    

    if (request.url === "/")
        fileServer.serveFile('/default.html', 200, {}, request, response);
    else if (request.url === "/remember" && request.method === "POST")
        request.
    else
        fileServer.serveFile('/404.html', 404, {}, request, response);
        
//    var url = "";
//     var urlParserResult = urlParser.parse(req.url.substring(1));
//    if (urlParserResult.host)
//        url = urlParserResult.host;
//    if (url.pathname)
//        url += url.pathname;
//    
//    console.log("url:"+url);       

//if (url === "")
//{
//    //res.end("Enter url");
// 
// req.addListener('end', function () {
//        fileServer.serve(req, res);
//    });
//}
//
//var request = require('request');
//request("http://"+url, function (error, response, body) {
//  if (!error && response.statusCode == 200) {
//    res.end(body) // Print the google web page.
//  }
//})

//var options = {
//  host: url.host,
//  path: url.pathname
//};
//
//var callback = function(response) {
//  var str = '';
//
//  //another chunk of data has been recieved, so append it to `str`
//  response.on('data', function (chunk) {
//    str += chunk;
//  });
//
//  //the whole response has been recieved, so we just print it out here
//  response.on('end', function () {
//    //console.log(str);
//        res.end(str);
//
//  });
//}
//http.request(options, callback).end();

 //   response.writeHead(404, {'Content-Type': 'text/html'});
  //  response.end("Page not found");
}).listen(process.env.PORT, process.env.IP);

