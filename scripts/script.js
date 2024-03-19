import {allFilterButtonsCreation} from './filters.js'
import {galleryElementCreation} from './gallery.js'

const apiURL = `http://localhost:5678/api/works`





//Récupération et conversion des éléments via l'API +
async function fetchData() {
    const response = await fetch(apiURL)
    const data = await response.json()
    allFilterButtonsCreation(data)
    galleryElementCreation(data)
}

fetchData()





