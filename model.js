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

		conn.query('CREATE TABLE IF NOT EXISTS Users(Id integer AUTO_INCREMENT, Role integer, Username varchar(255), Email varchar(255), password varchar(255), PRIMARY KEY(Id,Email,Username))',(error,result)=>
			{
				if (error){ 
					console.log("Error Creating Users Table!");
				}
			});

		conn.query('CREATE TABLE IF NOT EXISTS Sessions(username varchar(255), Role integer, Active integer, PRIMARY KEY(username))',(error,result)=>
			{
				if (error){ 
					console.log("Error Creating Sessions Table!");
				}
			});


		
		}
	}); 

	},20)


}




module.exports.createDB=createDB