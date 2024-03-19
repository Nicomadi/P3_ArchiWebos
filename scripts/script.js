import {allFilterButtonsCreation} from './filters.js'
import {galleryElementCreation} from './gallery.js'
import {logInBtnManagement} from "./login.js"

const apiURL = `http://localhost:5678/api/works`


const penToSquare =`<i class="fa-regular fa-pen-to-square"></i>`

if (window.sessionStorage.getItem("token")) {
    console.log("Connecté")
}

//Récupération et conversion des éléments via l'API +
async function fetchData() {
    const response = await fetch(apiURL)
    const data = await response.json()
    allFilterButtonsCreation(data)
    galleryElementCreation(data)
}

logInBtnManagement(window.sessionStorage.getItem("token"))
fetchData()










