
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

// Check email_empty
// Check email_domain
// Check valid email

//pass_length
//empty
//valid

//username length
//empty
//valid

function registerEmailEmpty(email) 
{
	if (email.length < 1) 
	{
		console.log("Email field is empty")
	 	console.log("RegisterEmailEmpty Test failed!")
	}else {
		console.log("Register Success!")
	}
}

//registerEmailEmpty("")

function registerEmailPattern(email) 
{
	var pattern = "umair@gmail.com"
	if ((email.length < 1) || (email != pattern)) 
	{
		console.log("No Email Address Provided!")
	 	console.log("RegisterEmailPattern Test failed!")
	}else {
		console.log("Register Success!")
	}
}
//registerEmailPattern("")




function registerEmailValid(email) 
{
	var pattern = "umair@gmail.com"
	if ((email.length < 1) || (email != pattern)) 
	{
		console.log("Validated response Failed!")
	 	console.log("RegisterEmailValid Test failed!")
	}else {
		console.log("Register Success!")
	}
}
//registerEmailValid("")





function registerUsernameEmpty (username) 
{
	if (username.length < 1) 
	{
		console.log("Username field is empty")
	 	console.log("RegisterUsernameEmpty Test failed!")
	}else {
		console.log("Register Success!")
	}
}

//registerUsernameEmpty("")




function registerUsernameLength (username) 
{
	if (username.length < 5) 
	{
		console.log("Username is less than 5 characters!")
	 	console.log("RegisterUsernameLength Test failed!")
	}else {
		console.log("Register Success!")
	}
}

//registerUsernameLength("umar")





function registerUsernameValid (username) {
	var pattern = "umair001"
	if ((username.length < 1) || (username != pattern)) 
	{
		console.log("Validated response Failed!")
	 	console.log("RegisterUsernameValid Test failed!")
	}else {
		console.log("Register Success!")
	}
}
//registerUsernameValid("Umairnonvalid")



function registerPasswordEmpty (password) 
{
	if (password.length < 1) 
	{
		console.log("Password field is empty")
	 	console.log("RegisterPasswordEmpty Test failed!")
	}else {
		console.log("Register Success!")
	}
}

//registerPasswordEmpty("")




function registerPasswordLength (password) {
	if (password.length < 5) 
	{
		console.log("Password is less than 5 characters!")
	 	console.log("RegisterPasswordLength Test failed!")
	}else {
		console.log("Register Success!")
	}
}

//registerPasswordLength("umar")




function registerPasswordValid (password) {
	var pattern = "umair@12345"
	if ((password.length < 1) || (password != pattern)) 
	{
		console.log("Validated response Failed!")
	 	console.log("RegisterPasswordValid Test failed!")
	}else {
		console.log("Register Success!")
	}
}
//registerPasswordValid("umair@123456")





function loginEmailEmpty(email) 
{
	if (email.length < 1) 
	{
		console.log("Email field is empty")
	 	console.log("LoginEmailEmpty Test failed!")
	}else {
		console.log("Login Success!")
	}
}

//loginEmailEmpty("")






function loginEmailValid(email) 
{
	var pattern = "umair@gmail.com"
	if ((email.length < 1) || (email != pattern)) 
	{
		console.log("Validated response Failed!")
	 	console.log("LoginEmailValid Test failed!")
	}else {
		console.log("Login Success!")
	}
}
//loginEmailValid("umair1@gmail.com")




function loginPasswordEmpty (password) 
{
	if (password.length < 1) 
	{
		console.log("Password field is empty")
	 	console.log("LoginPasswordEmpty Test failed!")
	}else {
		console.log("Login Success!")
	}
}

//loginPasswordEmpty("")




function loginPasswordValid (password) 
{
	var pattern = "umair@12345"
	if ((password.length < 1) || (password != pattern)) 
	{
		console.log("Validated response Failed!")
	 	console.log("LoginPasswordValid Test failed!")
	}else {
		console.log("Login Success!")
	}
}
//loginPasswordValid("umair@123456")




function getDashboard(email) 
{
		var pattern = "umair@gmail.com"
	if ((email.length < 1) || (email != pattern)) 
	{
		console.log("Validated response Failed!")
	 	console.log("getDashboard Test failed!")
	}else {
		console.log("Dashboard Success!")
	}
}

//getDashboard("umair1@gmail.com")