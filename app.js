var http = require('http'),
url = require('url'),
fs = require('fs'),
newPostFormHTML = fs.readFileSync('views/post/new.html'),
qs = require('querystring');

function renderNewPostForm(request, response){
	response.writeHead(200, {"Content-Type": "text/html; charset-utf-8"});
	response.end(newPostFormHTML);
}

function addNewPost(request,response){
	parseBody(request, function(body){
		var post = {
			title: body.title,
			content: body.content
		}
		console.log('Title: ' + post.title);
		console.log('Content: ' + post.content);
	})
	response.end();
}

//Utils
function render404(request, response){
	response.writeHead(404);
	response.end("404 File Not Found");
}

function parseBody(request, callback){
	var body = '';
	request.on('data', function(chunk) {
		body += chunk;
	});
	request.on('end', function() {
		callback(qs.parse(body));
	});
}

//Routes
var newPostFormRegex = new RegExp('^/posts/new/?$'),
newPostForm = new RegExp('^/posts/?$')

//Server
var server = http.createServer(function(request, response){
	var pathName = url.parse(request.url).pathname;
	if (newPostFormRegex.test(pathName)){
		renderNewPostForm(request, response);
	}
	else if (newPostForm.test(pathName)){
		addNewPost(request, response);
	}

	else {
		render404(request, response);
	}
2

});

server.listen(8080, '192.168.33.10');

console.log('Listening on http://192.168.33.10:8080');
