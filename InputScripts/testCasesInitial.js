
function check_db (db_name,db_pass,db_user)
{
	if (db_name == "") 
	{
		console.log("Database connection is empty")
		console.log("Test Check_DB Failed!!")
	}else {
		
		var connect_str = ""
	}
}

function insertData(db,data)
 {
	if (db)
	 {
	 	query="insert into Payments values("+data+")"
	 	db.execute(query)
	 } 
	 else
	 {
	 	console.log("Connection failed to the database!")
	 	console.log("Connot insert data to the database!")
	 	console.log("insertData Test failed!")
	 }
}

function deleteRecord (db,data)
{
	if (db)
	 {
	 	query="delete from payments where name="+data+""
	 	db.execute(query)
	 } 
	 else
	 {
	 	console.log("Connection failed to the database!")
	 	console.log("Connot delete record to the database!")
	 	console.log("deleteRecord Test failed!")
	 }
}
function updateRecord (db,data,name)
{
	if (db)
	 {
	 	query="update from payments values('"+data+"') where name="+name+""
	 	db.execute(query)
	 } 
	 else
	 {
	 	console.log("Connection failed to the database!")
	 	console.log("Connot update record to the database!")
	 	console.log("updateRecord Test failed!")
	 }
}
function fetchRecord (db,record)
{
	if (db)
	 {
	 	query="select * from payment where name="+record+""
	 	db.execute(query)
	 } 
	 else
	 {
	 	console.log("Connection failed to the database!")
	 	console.log("Connot fetch record to the database!")
	 	console.log("fetchRecord Test failed!")
	 }
}
function loginUser (db,username,password) 
{
	if (db) 
	{
		var uname=mysql_escape_string(username.strip())
		query="Select password from user where username="+uname+""
		var result=db.execute(query)
		if (query==password)
		 {
		 	console.log("Login Success!")
		 }
	} 
	else	
	{	console.log("Connection failed to the database!")
	 	console.log("Could'nt find the record in DB!")
	 	console.log("Login Test failed!")
	}
}

function signupUser (db,username,password,email) 
{
	if (db) 
	{
		var uname=mysql_escape_string(username.strip())
		var pass=mysql_escape_string(password.strip())
		var em=mysql_escape_string(email.strip())
		var query="insert into users(username,password,firstname,lastname,ph) \
		values('"+username+","+password+","+email+"')"
		var result=db.execute(query)
		if (result) 
		{
			console.log("Registeration Successful!")
		}
	} 
	else
	{
		console.log("Connection failed to the database!")
	 	console.log("Could'nt insert the record in DB!")
	 	console.log("signupUser Test failed!")
	}
}
function checkFraud (db,id) 
{
	if (db) {
		query="select * from Payments where id="+id+""
		result = db.execute(query)
		check = sendToML(result)

		if (check)
		 {
		 	console.log("Payment Fraud")
		 }
		 else
		 {
		 	console.log("payment ok")
		 }
	} 
	else {
		console.log("Connection failed to the database!")
	 	console.log("Could'nt retrieve the record in DB!")
	 	console.log("checkFraud Test failed!")
	}
}
function viewStats (data)
 {
	if (data) 
	{
		makeStats(data)
	} else {
		console.log("No data found for stats")
	 	console.log("Could'nt retrieve the records!")
	 	console.log("viewStats test Failed!")
	}
}
function deletePayment (db,pid)
 {
	if (db) 
	{
		query = "delete frm Payments where id="+pid+""
		result = db.execute(query)
		if (result) {
			console.log("Payment deleted!")
		}

	} else {
	 	console.log("Could'nt delete the Payment record!")
	 	console.log("paymentDelete Test failed!")
	}
}
function approvePayment (db,pid) 
{
		if (db) 
	{
		query = "delete from fraud where id="+pid+""
		result = db.execute(query)
		if (result) {
			console.log("Payment Approved!")
		}

	} else {
	 	console.log("Could'nt approve the Payment record!")
	 	console.log("paymentApprove Test failed!")
	}
}

function logoutUser (db,username)
{
	 if (db) 
	{
		uname=mysql_escape_string(username)
		query = "delete from fraud where username="+uname+""
		result = db.execute(query)
		if (result) {
			console.log("Logout Success!")
		}

	} else {
	 	console.log("Could'nt delete the SESSION!")
	 	console.log("logoutUser Test failed!")
	}
}
