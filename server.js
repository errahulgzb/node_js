var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require("fs");
var cookieParser = require('cookie-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var upload = multer({ dest: './uploads' });
app.use(cookieParser());
app.use(express.static('public'));

app.get("/index.htm",function(req,res){
		res.sendFile(__dirname+"/"+"index.htm");
});

app.get("/formfile.htm",function(req,res){
		res.sendFile(__dirname+"/"+"formfile.htm");
		//res.render('./formfile.htm');
});

app.post("/process_post",urlencodedParser,function(req,res){
	response={
			 first_name:req.body.first_name,
			 last_name:req.body.last_name
			 };

		res.end(JSON.stringify(response));
});

app.post("/file_upload",function(req,res){
  console.log("Cookies: ", req.cookies)
	var storage = multer.diskStorage({
                destination: function (req, file, callback) {
                callback(null, './uploads');
                },
                filename: function (req, file, callback) {
                console.log(file.fieldname);
                callback(null, file.fieldname + '-' + Date.now()+".png");
                }
            });
  var upload = multer({ storage: storage }).single('file');
  upload(req, res, function (err) 
    {
        //console.log(req.file);
        console.log(req.body);
        if (err) 
        {
            console.log("Photo API ERROR: "+err);
            return res.end("Error uploading file.");
        }
       // console.log(res);
        // res.end(JSON.stringify(res));
       
       
       // res.json("File is uploaded");
    });
});

app.get('/userlists',function(req,res){
  fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data){
      console.log(data);
      res.end(data);
   });
})

// add user list 

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.post('/addUser',function(req,res){
  // First read existing users.
  fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
      data = JSON.parse(data);
      data["user4"] = user["user4"];
      console.log(data);
      res.end(JSON.stringify(data));
   });

})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

var id=2;
app.delete('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
      data = JSON.parse(data);
      delete data["user" + 2];
       
      console.log(data);
      res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});