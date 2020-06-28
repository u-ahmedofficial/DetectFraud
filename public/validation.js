
function handler () {
    id= document.getElementsByClassName("empty");
    if ( checkEmail(id[0]) && checkPassword(id[1]) ) 

        {
					//document.getElementsByClassName("valid")[0].style.visibility="visible"; 
					// console.log("Login Successful");
					// console.log("LOGIN Test Passed!");
                    return true;
        } 
          else
            {
               return false;
            }
}

function checkEmail (id) {
        var val=document.getElementById("email").value;
        if(val.length == 0){
            id.style.visibility="visible";
			console.log("Email cannot be empty!");
			console.log("loginEmailEmpty Passed");
			
			
			
			return false;
        }
        else {
                            document.getElementsByClassName("invalid")[0].style.visibility="hidden";
                            id.style.visibility="hidden";
                            return true;
                          }
       
}

function checkPassword (id) {
        var val=document.getElementById("password").value;
        if(val.length==0){
            id.style.visibility="visible"; 
			console.log("Password cannot be empty!");
			console.log("loginPasswordEmpty Passed");
			return false;
        }
             else{
                document.getElementsByClassName("invalid")[1].style.visibility="hidden";
                id.style.visibility="hidden"; 
				// console.log("Password you entered doesn't match to any account!");
				// console.log("loginPasswordValid Passed");
				return true;
             }
    
}

window.onload=function ()
{
        submit = document.getElementsByName("login");
        submit[0].addEventListener("click",handler);
}