

function handler () {
    id= document.getElementsByClassName("hidden");
    if ( checkName(id[0]) && checkEmail(id[1]) && checkPassword(id[2]) ) 
        {     
            document.getElementsByClassName("valid")[0].style.visibility="visible";
			
            return true;
        } 
    else
    {
        return false;
    }
}



function checkName (id) {
        var val=document.getElementById("username").value;
        var regex=/^[a-zA-z]+$/;
        if(val.length == 0){
            document.getElementsByClassName("empty")[0].style.visibility="visible";
			console.log("Username Field cannot be Empty!");
			console.log("registerUsernameEmpty Passed");
			return false;
        }

     if (!regex.test(val) && val.length>0)
     {
        id.style.visibility = "visible";
		console.log("Email you entered doesn't match criteria i.e. Only Characters!");
		console.log("registerUsernameLength Passed");
        return false;
     }   
     else
     {
            id.style.visibility = "hidden";
			console.log("Valid Username Entered!");
			console.log("registerUsernameValid Passed");
            return true;
        }
}


function checkEmail (id) {
        var val=document.getElementById("email").value;
        var regex=/^[a-z]{1}([a-z0-9\-\_]+)@([a-z0-9\-]+).([a-z]{2,8})(.[a-zA-z]{2,8})?$/;

        if(val.length == 0){
            document.getElementsByClassName("empty")[1].style.visibility="visible";
			console.log("Email Field cannot be Empty!");
			console.log("registerEmailEmpty Passed");
			return false;
        }

            if (!regex.test(val) && val.length>0){
                id.style.visibility = "visible";
				console.log("Email you entered doesn't match criteria i.e. email@company.com!");
				console.log("registerEmailPattern Passed");
                return false;
            }   
     
                    else {
                          id.style.visibility = "hidden";
						  console.log("Valid Email Addres Entered!");
						  console.log("registerEmailValid Passed");
                          return true;
       }
}


function checkPassword (id) {
        var val=document.getElementById("password").value;

        if(val.length == 0){
            document.getElementsByClassName("empty")[2].style.visibility="visible"; 
			console.log("Password Field cannot be Empty!");
			console.log("registerPasswordEmpty Passed!");
			return false;
        }
        
             else if (val.length <= 5 && val.length>0){
               id.style.visibility = "visible";
			   console.log("Password you entered doesn't match criteria! i.e. Min 5 Characters");
				console.log("registerPasswordLength Passed");
                return false; } 

                    else {
                        id.style.visibility = "hidden";
						 console.log("Valid Password Entered!");
						 console.log("registerPasswordValid Passed");
                        return true; }
    
}



window.onload=function ()
{
        submit = document.getElementsByName("register");
        submit[0].addEventListener("click",handler);
}