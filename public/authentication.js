document.getElementById("regButton").addEventListener("click",register);
document.getElementById("loginButton").addEventListener("click",login);
document.getElementById("statusButton").addEventListener("click",getStatus);

async function register(event){
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value; 
    let status = document.getElementById("status").value;
    const response = await fetch("/register",{
        method: "POST",
        body: new URLSearchParams({
            username: username,
            password: password,
            status:status
        })
    });

    let result = document.getElementById("result");
if(response.ok){
    //console.log(response)
    result.innerText = "Success! Thank you for your registration!!";
}else{
    //console.log("Response is failed");
    result.innerText = "Registration failed. Try again.";
}
}

async function login(event){
    event.preventDefault();
    let username = document.getElementById("loginusername").value;
    let password = document.getElementById("loginpassword").value; 
    const response = await fetch("/login",{
        method: "POST",
        body: new URLSearchParams({
            username: username,
            password: password
        })
    });

    let result = document.getElementById("loginresult");
if(response.ok){
    //console.log(response)
    const data = await response.json(); 
    result.innerText = "Token: "+data.token;
    }else{
    //console.log("Response is failed");
    result.innerText = "Login failed. Try again.";
    }
}

async function getStatus(event){
    event.preventDefault();
    
    let token = document.getElementById("token").value.trim(); 
    const response = await fetch("/status",{
        method: "GET",
        headers: {"x-auth": token}
        });

    let result = document.getElementById("statusresult");
if(response.ok){
    //console.log(response)
    const data = await response.json(); 
    result.innerText = data.status;
    }else{
    //console.log("Response is failed");
    result.innerText = "Token failed. Try again.";
    }
}

