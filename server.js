var express=require('express');
var app=express();
app.use(express.static('public'));
app.get("/index.htm",function(req,res){
		res.sendFile(__dirname+"/"+"index.htm");
})

app.get("/process_get",function(req,res){
	responce={
			 first_name:req.query.first_name,
			 last_name:req.query.last_name
			 };

		console.log(responce);
})