// sophie.bluel@test.tld
// mdp : S0phie 


// Recuperation des élements du DOM
const formLogin = document.querySelector(".login-page")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const loginPage = document.querySelector(".login-div")
const mainPage = document.querySelector(".main-div")
const loginBtn = document.querySelector(".login-btn")

function submitLogin(){
    formLogin.addEventListener("submit",(event)=>{
        event.preventDefault()
        const idAndPassword = JSON.stringify({"email":emailInput.value, "password": passwordInput.value })
        fetch("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: idAndPassword
        }).then(result => result.json())
            .then(data => verificationLogin(data))
    })
}

function verificationLogin(data){
    if (!data.token) {

        // TO DO meilleur message d'information d'erreur
        alert("User not found")
    } else {
        window.sessionStorage.setItem("token", data.token)
        location.reload()
        
    }
}

export function logInBtnManagement(boolean){
    if (boolean) {
        loginBtn.textContent ="log out"
        loginBtn.addEventListener("click", ()=>{
            console.log(loginBtn.getev)
            logOut()
        })
    }else{
        loginBtn.addEventListener("click", ()=>{
            logIn()
        })
    }
}

function logIn(){
    if (loginBtn.style.fontWeight === "600") {
        loginBtn.style.fontWeight = "400"
    }else{
        loginBtn.style.fontWeight ="600"
    }
    mainPage.hidden = loginPage.hidden
    loginPage.hidden = !mainPage.hidden
    submitLogin()
}


function logOut(){
window.sessionStorage.removeItem("token")
location.reload()
}



