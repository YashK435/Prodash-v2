function linkToSignUp() {
    window.open("signup.html", "_self");
}
document.getElementById("loginForm").addEventListener("submit",function(e){
    e.preventDefault()
    const loginData={
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }
    sessionStorage.setItem('loginData', JSON.stringify(loginData));
    const authData=JSON.parse(sessionStorage.getItem('loginData'));
    const storedData=JSON.parse(sessionStorage.getItem("userData"))
    if(authData.email!=storedData.email){
        window.alert("Incorrect Email ID\nOr\nPlease Sign-Up First")
    }
    else{
        if(authData.password!=storedData.password){
            window.alert("Incorrect Password")
        }
        else{
            window.location.href="home.html"
        }
    }
})