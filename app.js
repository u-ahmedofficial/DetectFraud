// JavaScript Document
 const express= require ('express');
 const mysql= require('mysql');
 //we need express module once so we use require here.. for rest we create dependencies 
 const bodyParser= require ('body-parser');
 const jade =require ('jade');
 const http= require ('http');

var app = SetupExpress();

 function SetupExpress()
 {
	const app= express();
	const server= http.createServer(app);
	server.listen(3000,function(){
	console.log('Listening on port 3000'); 
								}
	 
 );
	return app;
};

app.get("/",(req,res)=>{

	res.sendFile(__dirname+'/public/index.html');
})

	ConfigureExpress(app);

function ConnectDB ()
{
	var con = mysql.createConnection(
	{
	host: "localhost",
	user: "root",
	password: "",
	database: "my_db"					
	});

	con.connect(function(err) 
	{
	if (err) throw err;
	console.log("Connected!");
	}); 

}


function ConfigureExpress(app)

{
	app.use(express.static('public'));
	app.set('view engine','jade');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));

};