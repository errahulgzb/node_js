/* Hello, World! program in node.js */
console.log("Hello, World!")
var http = require("http");

//http.createServer(function(request,response){

	// Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
  // response.writeHead(200, {'Content-Type': 'text/plain'});
// Send the response body as "Hello World"
//   response.end('Hello World\n');
//}).listen(8082);

// Console will print the message

// buffer function
var buff= new Buffer(26);
for(var i=0;i<26;i++){
	buff[i]=i+97;
}

//console.log( buff.toJSON('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
//console.log( buff.toJSON('ascii',0,5));   // outputs: abcde
//console.log( buff.toJSON('utf8',0,5));    // outputs: abcde
//console.log( buff.toJSON(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde

// stream function

var stre= require("fs");
var data="";
// create readable stream
var readerstream=stre.createReadStream("demo.txt");
// set the encoding to be utf8
readerstream.setEncoding('UTF8');
// handle stream events data,end and error
readerstream.on('data',function(chunk){
	data+=chunk;
});

readerstream.on('end',function(){
	console.log(data);
});
readerstream.on('error',function(){
	console.log(err.stack);
});

// asynchorons read function
stre.readFile('demo.txt',function(err,data){
	if(err){
		return console.error(err);
	}
	console.log("Asynchronous read: " + data.toString());
});

// Synchronous read

var data=stre.readFileSync("demo.txt");
console.log("Synchronous read: " + data.toString());

function printHello() {
   console.log( "Hello, World!");
}

// Now call above function after 2 seconds
setInterval(printHello, 2000);