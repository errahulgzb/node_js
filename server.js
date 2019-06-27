var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require("fs");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var upload = multer({ dest: './uploads' });
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
        console.log(req.file);
        console.log(req.body);
        if (err) 
        {
            console.log("Photo API ERROR: "+err);
            return res.end("Error uploading file.");
        }
        console.log("SUCCESS");
       
       
       // res.json("File is uploaded");
    });
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});