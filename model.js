 const mysql= require('mysql');

function createDB()
{

	var con = mysql.createConnection(
	{
	host: "localhost",
	user: "root",
	password: ""
	});

	con.connect(function(err) 
	{
		if (err) 
		{
			console.log("Error in DB Connection!")
			return false;

		}
		else
		{
		console.log("DB Connected!");

		con.query('CREATE DATABASE IF NOT EXISTS detectfraud',(error,result)=>
			{
				if (error){ 
					return false;
				}
			});
		
		}
	}); 

	setTimeout(()=>{

	var conn = mysql.createConnection(
	{
	host: "localhost",
	user: "root",
	password: "",
	database:"detectfraud"
	});


	conn.connect(function(err) 
	{
		if (err) 
		{
			console.log('Error connecting Schema!')
		}
		else
		{

		conn.query('CREATE TABLE IF NOT EXISTS Users(Id integer AUTO_INCREMENT, Role integer NOT NULL, Username varchar(255) NOT NULL UNIQUE, Email varchar(255) UNIQUE, Password varchar(255) NOT NULL, PRIMARY KEY(Id,Email))',(error,result)=>
			{
				if (error){ 
					console.log(error);
				}
			});

		conn.query('CREATE TABLE IF NOT EXISTS Sessions(username varchar(255), Role integer NOT NULL, Active integer NOT NULL, PRIMARY KEY(username))',(error,result)=>
			{
				if (error){ 
					console.log("Error Creating Sessions Table!");
				}
			});

		conn.query('CREATE TABLE Payments(Gender integer,Married integer,Dependents integer,Education integer,Self_Employed integer,ApplicantIncome float,Coapplicant_Income float,LoanAmount float,Loan_Amount_Term float,CreditHistory float,Property_Area integer)',(error,result)=>
			{
				if (error){ 
					console.log("    ");
				}else{

						const fs = require('fs');
						const csv = require('fast-csv');
						let stream = fs.createReadStream("ULoan_Test");
						let myData = [];
						let csvStream = csv
									.parse()
									.on("data", function (data) {
											myData.push(data);
																})
									.on("end", function () {
													myData.shift();
		
									// create a new connection to the database
									const connection = mysql.createConnection({
											host: 'localhost',
											user: 'root',
											password: '',
											database: 'detectfraud'
																});

									// open the connection
									connection.connect((error) => {
									if (error) {
										console.error(error);
										} else {
										let query = 'INSERT INTO Payments(Gender,Married,Dependents,Education,Self_Employed,ApplicantIncome,Coapplicant_Income,LoanAmount,Loan_Amount_Term,CreditHistory,Property_Area) VALUES ?';
										connection.query(query, [myData], (error, response) => {
										if(error) console.log("Error Inserting Records to Payments!");
																	});
												}
																});
														});

										stream.pipe(csvStream);
					}

			});

		conn.query('CREATE TABLE Fraud(Gender integer,Married integer,Dependents integer,Education integer,Self_Employed integer,ApplicantIncome float,Coapplicant_Income float,LoanAmount float,Loan_Amount_Term float,CreditHistory float,Property_Area integer)',(error,result)=>
			{
				if (error){ 
					console.log(" ");
				}else {
					const {spawn} = require('child_process');
					var dataToSend;
					// spawn new child process to call the python script
					const python = spawn('python3', ['UM.py']);
					// collect data from script
					python.stdout.on('data', function (data) {
					console.log('Pipe data from python script ...');
					dataToSend = data.toString();
															});
					// in close event we are sure that stream from child process is closed
					python.on('close', (code) => {
					//console.log(`child process close all stdio with code ${code}`);
					// send data to browser
					const fs = require('fs');
						const csv = require('fast-csv');
						let stream = fs.createReadStream("fraud");
						let myData = [];
						let csvStream = csv
									.parse()
									.on("data", function (data) {
											myData.push(data);
																})
									.on("end", function () {
													myData.shift();
		
									// create a new connection to the database
									const conn = mysql.createConnection({
											host: 'localhost',
											user: 'root',
											password: '',
											database: 'detectfraud'
																});

									// open the connection
									conn.connect((error) => {
									if (error) {
										console.error(error);
										} else {
										let query = 'INSERT INTO Fraud(Gender,Married,Dependents,Education,Self_Employed,ApplicantIncome,Coapplicant_Income,LoanAmount,Loan_Amount_Term,CreditHistory,Property_Area) VALUES ?';
										conn.query(query, [myData], (error, response) => {
										if(error) console.log("Error Inserting Records to Fraud!");
																	});
												}
																});
														});

										stream.pipe(csvStream);
					
												});
				}	
			});
		
		
		}
	}); 

	},30)


}




module.exports.createDB=createDB