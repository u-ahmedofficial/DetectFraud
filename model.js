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
					console.log("Error Creating Payments Table!");
				}
			});
		conn.query('CREATE TABLE Fraud(Gender integer,Married integer,Dependents integer,Education integer,Self_Employed integer,ApplicantIncome float,Coapplicant_Income float,LoanAmount float,Loan_Amount_Term float,CreditHistory float,Property_Area integer)',(error,result)=>
			{
				if (error){ 
					console.log("Error Creating Fraud Table!");
				}
			});
		
		
		}
	}); 

	},30)


}




module.exports.createDB=createDB