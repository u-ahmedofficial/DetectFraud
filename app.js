// JavaScript Document
const {spawn} = require('child_process');
 const express= require ('express');
 const mysql= require('mysql');
 //we need express module once so we use require here.. for rest we create dependencies 
 const bodyParser= require ('body-parser');
 const jade =require ('ejs');
 const http= require ('http');
 const model = require("./model")



var app = SetupExpress();

 function SetupExpress()
 {
	const app= express();
	const server= http.createServer(app);
	server.listen(3000,function(){
	console.log('Listening on port 3000'); 
	model.createDB();
								}
	 
 );
	return app;
};

app.use("/register",(req,res)=>{

	res.render('register');
});

app.use("/admin",(req,res)=>{

	res.render('Admin');
});

app.use("/user",(req,res)=>{

	res.render('User');
});

app.use("/table",(req,res)=>{

	res.render('Table');
});

app.use("/login",(req,res)=>{

	console.log(req.query);
	res.render('lol')
					})




app.get("/",(req,res)=>{

	res.render('index');

	// var dataToSend;
 // // spawn new child process to call the python script
 // const python = spawn('python3', ['UM.py']);
 // // collect data from script
 // python.stdout.on('data', function (data) {
 //  console.log('Pipe data from python script ...');
 //  dataToSend = data.toString();
 // });
 // // in close event we are sure that stream from child process is closed
 // python.on('close', (code) => {
 // console.log(`child process close all stdio with code ${code}`);
 // // send data to browser
 // res.send(dataToSend)
 // });

})

	ConfigureExpress(app);

function ConfigureExpress(app)

{
	app.use(express.static('public'));
	app.set('view engine','ejs');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));

};