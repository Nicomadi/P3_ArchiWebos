import {galleryElementCreation} from './gallery.js'

//Création de tous les boutons filtres
export function allFilterButtonsCreation (works) {

    //On récupère les différentes catégories en évitant les doublons
    const categoryCount = new Set()
    const categoryName = new Set()
    categoryCount.add(0)
    categoryName.add("Tous")
    for (const work of works) {
        categoryCount.add(work.category.id)
        categoryName.add(work.category.name)
    }
    // Transformation du Set en Liste
    const categoryCountArray = [...categoryCount]
    const categoryNameArray = [...categoryName]

    //Création des boutons
    const filterButtonsParent = document.querySelector(".filters")


    for (let i = 0 ; i < categoryCountArray.length; i++) {
        filterButtonCreation(filterButtonsParent,categoryCountArray[i],categoryNameArray[i],works)
    }
    
}

// Creation d'un bouton filtre
function filterButtonCreation(btnparent,category,text,works){
    const filterBtnElement = document.createElement("button")
    filterBtnElement.dataset.category = category
    filterBtnElement.textContent = text
    filterBtnElement.classList.add("filter-btn")
    if (category === 0) {
        filterBtnElement.classList.add("filter-selected")
    }
    filterBtnElement.addEventListener("click",(event =>{
        addListenerFilterButton(event.target,works)
    }))
    btnparent.appendChild(filterBtnElement)
}



// Filtrage des éléments du portefolio
function addListenerFilterButton(btn,works){
        filterBtnManagement(btn)
        const btnCategory = parseInt(btn.dataset.category)
        if (btnCategory !== 0) {
            const filteredWorks = works.filter(work =>work.categoryId === btnCategory)
            galleryElementCreation(filteredWorks)
        } else {
            galleryElementCreation(works)
        }
}


// Gère le style des boutons filtres
function filterBtnManagement(currentButton){
    const filterButtons = document.querySelectorAll(".filter-btn")
    filterButtons.forEach(btn => btn.classList.remove("filter-selected"))
    currentButton.classList.add("filter-selected")
}