import {allFilterButtonsCreation} from './filters.js'
import {galleryElementCreation} from './gallery.js'
import {logInBtnManagement} from "./login.js"
import { initialisationModal } from './modal.js'

const apiURL = `http://localhost:5678/api/works`
let isConected = window.sessionStorage.getItem("token")


//Récupération et conversion des éléments via l'API +
async function fetchData() {
    const response = await fetch(apiURL)
    const data = await response.json()
    allFilterButtonsCreation(data,isConected)
    galleryElementCreation(data)
    initialisationModal(data)
    console.log("fetch terminé")
}

logInBtnManagement(isConected)
fetchData()










