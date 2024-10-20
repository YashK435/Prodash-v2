document.getElementById("signUpForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
    const storedData=JSON.parse(sessionStorage.getItem('userData'));
    const pass=storedData.password
    const confirmPass=storedData.confirmPassword
    if(pass!=confirmPass){
        window.alert("Password and Confirm Password should match!")
        location.reload()
    }
    else{
        setTimeout(() => {
        window.location.href = "login.html";
        }, 500);
    }
    
});