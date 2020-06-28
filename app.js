// JavaScript Document
const {spawn} = require('child_process');
 const express= require ('express');
 const mysql= require('mysql');
 //we need express module once so we use require here.. for rest we create dependencies 
 const bodyParser= require ('body-parser');
 const jade =require ('ejs');
 const http= require ('http');
 const model = require("./model")
 const config = require("./config")
 const sanitizer=require('sanitizer')
 const fs = require('fs')
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
	
	let user=sanitizer.escape(req.query.username);
	let pass=sanitizer.escape(req.query.password);
	let email=sanitizer.escape(req.query.email);

	if (user && pass && email)
	 {
	 	var conn = mysql.createConnection(config);

		conn.connect(function(err) 
		{
			if (err) 
			{
				console.log('Error connecting Schema!')
			}else {
				let val = {Role:1,Username:conn.escape(user).replace(/'/g,""),Email:conn.escape(email).replace(/'/g,""),Password:conn.escape(pass).replace(/'/g,"")}
				conn.query("INSERT into Users SET ?",val,(error)=>{
					if (error) 
						{
							res.render('register');
						}else 
						{
							let val1={Username:conn.escape(user).replace(/'/g,""),Role:1,Active:0}
							conn.query("INSERT into Sessions SET ?",val1,(error)=>{
							if (error) 
								res.render('register')
							else 
								res.render('index');
															});
						}
				});
				
			}
	 	});

	}
	 else 
	 {
		res.render('register') 	
	 }
		

	});

app.use("/login",(req,res)=>{
	let email=sanitizer.escape(req.query.email);
	let pass=sanitizer.escape(req.query.password);
	if (email && pass) 
	{	
		var conn = mysql.createConnection(config);

		conn.connect(function(err) 
		{
			if (err) 
			{
				console.log('Error connecting Schema!')
			}else {
				
				// let val = {Role:0,Username:conn.escape(user).replace(/'/g,""),Email:conn.escape(email).replace(/'/g,""),Password:conn.escape(pass).replace(/'/g,"")}
				conn.query("SELECT * FROM Users WHERE Email=?",[conn.escape(email).replace(/'/g,"")],(error,rows)=>{
					if (error) 
						{

							res.render('index');
						}else 
						{

							// let val1={Username:conn.escape(user).replace(/'/g,""),Role:0,Active:0}
							if (email===rows[0].Email && pass===rows[0].Password) 
							{
									conn.query("UPDATE Sessions SET Active=? WHERE Username=?",[1,rows[0].Username],(error1)=>{
									if (error1) 
									{

										res.render('index')
									}
									else 
 										{

											if (rows[0].Role===0) 
											{
												var con=mysql.createConnection(config);
											con.connect(function (err) 
											{
												if (err) {console.log('Error connecting Fraud!')}
												else
												{
													con.query("SELECT * from Payments LIMIT 10",(error,rowss)=>{
														if(error) 
															console.log("Error Fraud!")
														else
															{
																var con=mysql.createConnection(config);
																con.connect(function (err) 
																{
																	if (err) {console.log('Error connecting Fraud!')}
																	else
																	{
																		con.query("SELECT * from Fraud LIMIT 5",(error,rowsss)=>{
																		if(error) 
																			console.log("Error Fraud!")
																		else
																		{
																			let rawdata = fs.readFileSync('data.txt');
																			let data = JSON.parse(rawdata);
																			res.render('Admin',{Username:rows[0].Username,Email:email,fraud:rowss,fraud1:rowsss,malePercent:data.malePercent,femalePercent:data.femalePercent,marriedPercent:data.marriedPercent,unmarriedPercent:data.unmarriedPercent})

																		}

																			
																					});
																	}
													
																});
															}
													});
												}
													
											});

											}else if(rows[0].Role===1)
											{
												var con=mysql.createConnection(config);
											con.connect(function (err) 
											{
												if (err) {console.log('Error connecting Fraud!')}
												else
												{
													con.query("SELECT * from Payments LIMIT 10",(error,rowss)=>{
														if(error) 
															console.log("Error Fraud!")
														else
														{
															let rawdata = fs.readFileSync('data.txt');
															let data = JSON.parse(rawdata);
															//res.render('Admin',{Username:rows[0].Username,Email:email,fraud:rowss,fraud1:rowsss,malePercent:data.malePercent,femalePercent:data.femalePercent,marriedPercent:data.marriedPercent,unmarriedPercent:data.unmarriedPercent})
															res.render('User',{Username:rows[0].Username,Email:email,fraud:rowss,malePercent:data.malePercent,femalePercent:data.femalePercent,marriedPercent:data.marriedPercent,unmarriedPercent:data.unmarriedPercent})
															
														}


													});
												}
													
											});
											}
										}						});
							}
						}
				});
				
			}
	 	});

	}else
	{
		res.render('index');
	}
	
});

app.use("/logout",(req,res)=>{
	let email=sanitizer.escape(req.query.email).replace(/\+/g,"").trim();
	let user=sanitizer.escape(req.query.username).replace(/\+/g,"").trim();

	if (email && user)
	{
		var conn = mysql.createConnection(config);
		conn.connect(function(err) 
		{
			if (err) 
			{
				console.log('Error connecting Schema!')
			}else 
			{
				conn.query("UPDATE Sessions SET Active=? WHERE Username=?",[0,conn.escape(user).replace(/'/g,"")],(error1)=>{
									if (error1) 
									{

										res.render('index')
									}
									else
									{
										
										res.render('index')
									}																	});
			}
		});

	}else 
	{
		res.render("index")	
	}
});

app.use("/admin",(req,res)=>{

	let email=sanitizer.escape(req.query.email).replace(/\+/g,"").trim();
	let user=sanitizer.escape(req.query.username).replace(/\+/g,"").trim();

	if (email && user)
	{
		var conn = mysql.createConnection(config);
		conn.connect(function(err) 
		{
			if (err) 
			{
				console.log('Error connecting Schema!')
			}else 
			{
				conn.query("SELECT * FROM Users WHERE Username=?",[conn.escape(user).replace(/'/g,"")],(error1,rows)=>{
									if (error1) 
									{

										res.render('index')
									}
									else
									{
										if (user===rows[0].Username && rows[0].Role===0)
										{
											var con=mysql.createConnection(config);
											con.connect(function (err) 
											{
												if (err) {console.log('Error connecting Fraud!')}
												else
												{
													con.query("SELECT * from Payments LIMIT 10",(error,rowss)=>{
														if(error) 
															console.log("Error Fraud!")
														else
															{
																var connn=mysql.createConnection(config);
																connn.connect(function (err) 
																{
																	if (err) {console.log('Error connecting Fraud!')}
																	else
																	{
																		connn.query("SELECT * from Fraud LIMIT 5",(error,rowsss)=>{
																		if(error) 
																			{
																				console.log("Error Fraud!")
																			}
																		else
																			{
																				let rawdata = fs.readFileSync('data.txt');
																				let data = JSON.parse(rawdata);
																				res.render('Admin',{Username:rows[0].Username,Email:email,fraud:rowss,fraud1:rowsss,malePercent:data.malePercent,femalePercent:data.femalePercent,marriedPercent:data.marriedPercent,unmarriedPercent:data.unmarriedPercent})
																			}
																					

																					});
																	}
													
																});
															}
													});
												}
													
											});
										}else 
										{
											res.render('index')
										}
										
									}																	});
			}
		});

	}else 
	{
		res.render("index")	
	}
});

app.use("/user",(req,res)=>{

	let email=sanitizer.escape(req.query.email).replace(/\+/g,"").trim();
	let user=sanitizer.escape(req.query.username).replace(/\+/g,"").trim();

	if (email && user)
	{
		var conn = mysql.createConnection(config);
		conn.connect(function(err) 
		{
			if (err) 
			{
				console.log('Error connecting Schema!')
			}else 
			{
				conn.query("SELECT * FROM Users WHERE Username=?",[conn.escape(user).replace(/'/g,"")],(error1,rows)=>{
									if (error1) 
									{

										res.render('index')
									}
									else
									{
										if (user===rows[0].Username && (rows[0].Role===1 || rows[0].Role===0))
										{
											var con=mysql.createConnection(config);
											con.connect(function (err) 
											{
												if (err) {console.log('Error connecting Fraud!')}
												else
												{
													con.query("SELECT * from Payments LIMIT 10",(error,rowss)=>{
														if(error) 
															console.log("Error Fraud!")
														else{
															let rawdata = fs.readFileSync('data.txt');
															let data = JSON.parse(rawdata);
															res.render('User',{Username:user,Email:email,fraud:rowss,malePercent:data.malePercent,femalePercent:data.femalePercent,marriedPercent:data.marriedPercent,unmarriedPercent:data.unmarriedPercent})
														}
															
														
													});
												}
													
											});

										}else 
										{
											res.render('index')
										}
										
									}																	});
			}
		});

	}else 
	{
		res.render("index")	
	}
});

app.use("/Table",(req,res)=>{

	let email=sanitizer.escape(req.query.email).replace(/\+/g,"").trim();
	let user=sanitizer.escape(req.query.username).replace(/\+/g,"").trim();

	if (email && user)
	{
		var conn = mysql.createConnection(config);
		conn.connect(function(err) 
		{
			if (err) 
			{
				console.log('Error connecting Schema!')
			}else 
			{
				conn.query("SELECT * FROM Users WHERE Username=?",[conn.escape(user).replace(/'/g,"")],(error1,rows)=>{
									if (error1) 
									{

										res.render('index')
									}
									else
									{
										if (user===rows[0].Username && rows[0].Role===0)
										{

											var con=mysql.createConnection(config);
											con.connect(function (err) 
											{
												if (err) {console.log('Error connecting Fraud!')}
												else
												{
													con.query("SELECT * from Fraud",(error,rowss)=>{
														if(error) 
															console.log("Error Fraud!")
														else{
															let rawdata = fs.readFileSync('data.txt');
															let data = JSON.parse(rawdata);

															res.render('Table',{Username:user,Email:email,fraud:rowss,malePercent:data.malePercent,femalePercent:data.femalePercent,marriedPercent:data.marriedPercent,unmarriedPercent:data.unmarriedPercent})
														}
													});
												}
													
											});


										}else 
										{
											res.render('index')
										}
										
									}																	});
			}
		});

	}else 
	{
		res.render("index")	
	}
});

app.use("/approve",(req,res)=>{
	let email=sanitizer.escape(req.query.email).replace(/\+/g,"").trim();
	let user=sanitizer.escape(req.query.username).replace(/\+/g,"").trim();
	let applicant=sanitizer.escape(req.query.username).replace(/\+/g,"").trim();
	let coapplicant=sanitizer.escape(req.query.username).replace(/\+/g,"").trim();

	if (email && user)
	{
		var conn = mysql.createConnection(config);
		conn.connect(function(err) 
		{
			if (err) 
			{
				console.log('Error connecting Schema!')
			}else 
			{
				conn.query("SELECT * FROM Users WHERE Username=?",[conn.escape(user).replace(/'/g,"")],(error1,rows)=>{
									if (error1) 
									{

										res.render('index')
									}
									else
									{
										if (user===rows[0].Username && rows[0].Role===0)
										{

											var con=mysql.createConnection(config);
											con.connect(function (err) 
											{
												if (err) {console.log('Error connecting Fraud!')}
												else
												{
													con.query("DELETE from Fraud WHERE ApplicantIncome=? AND Coapplicant_Income=?",[conn.escape(applicant).replace(/'/g,""),conn.escape(coapplicant).replace(/'/g,"")],(error,rowss)=>{
														if(error) 
															console.log("Error Fraud DELETE!")
														else{
															let rawdata = fs.readFileSync('data.txt');
															let data = JSON.parse(rawdata);

															res.render('Table',{Username:user,Email:email,fraud:rowss,malePercent:data.malePercent,femalePercent:data.femalePercent,marriedPercent:data.marriedPercent,unmarriedPercent:data.unmarriedPercent})
														}
													});
												}
													
											});


										}else 
										{
											res.render('index')
										}
										
									}																	});
			}
		});

	}else 
	{
		res.render("index")	
	}
});

app.get("/",(req,res)=>{

	res.render('index');
})

	ConfigureExpress(app);

function ConfigureExpress(app)

{
	app.use(express.static('public'));
	app.set('view engine','ejs');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));

};