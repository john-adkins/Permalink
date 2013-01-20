
function getPermaLink(request, response) {
    //var id = "7WRqMzTKiRTRn2xMTchQA";
    var id = request.query.i;
    var conn = getMongoConn(); 
    var r = conn.collection(getMongoCollection()).findOne({Id: id}, function(err, result) { 
        if (result) 
            response.send(result.Content);
        else
            response.send("Permalink not found");
        //console.log(result);
    });
}

function makePermaLink(url, requestResult, response) {
    if (requestResult.Success) {
        var permaLink = {Id:generateKey(url), OriginalLink:url, Content:requestResult.Content};
        save(permaLink);
        //response.sendfile("default.html");
        response.send("<a href='/l?i="+permaLink.Id+"'>Permalink for "+ permaLink.OriginalLink +"</a>");
    }
}

function generateKey(dataToHash) {
    var crypto = require('crypto');
    var hash = crypto.createHash('md5').update(dataToHash).digest("base64");
    return hash.replace(/=/g,"").replace("/","");
}

function getMongoConn() {
    var mongo = require('mongoskin');
    return mongo.db('permalink:knil@alex.mongohq.com:10007/Permalink', {safe:true});   
}
function getMongoCollection() {
    return "Permalinks";
}
function save(permaLink) {
    var conn = getMongoConn();
    conn.collection(getMongoCollection()).insert(permaLink, function(err, result) {
        //console.log(result);
        conn.close();
    });
}

function makeHttpRequest(url, response) {
    var requestMod = require('request');
    requestMod(url, function (error, httpRequestResponse, body) {
        var requestResult = {Success:(!error && httpRequestResponse.statusCode == 200), Content:body};
        makePermaLink(url, requestResult, response);
    });
}


var express = require('express');
var app = express();
app.use(express.bodyParser());

app.get('/', function(request, response){
  response.sendfile("default.html");
});
app.post("/remember", function(request, response){
    var link = request.body.link;
    makeHttpRequest(link, response);
});
app.get("/l", function(request, response){
   
    getPermaLink(request, response);
});

app.listen(process.env.PORT);

