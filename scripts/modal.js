let modalStatus = null
const modal = document.getElementById("modal-Id")
const modifyBtn = document.querySelector(".modify-btn")
const closeBtn = document.querySelector(".close-modal-button")
const edition = document.querySelectorAll(".edition-classe")
const header = document.getElementById("header")

function openModal(btn){
    btn.addEventListener("click",(event)=>{
        event.preventDefault()
        modal.style.display = null
        modal.removeAttribute("aria-hidden")
        modal.setAttribute("aria-modal", "true")
    })
}

function closeModal(btn){
    btn.addEventListener("click",(event)=>{
        event.preventDefault()
        modal.style.display = "none"
        modal.removeAttribute("aria-modal")
        modal.setAttribute("aria-hidden", "true")
    })
}

export function initialisationModal(works){
    //Affichage du mode edition
    if(window.sessionStorage.getItem("token")){
        header.style.marginTop = "100px"
        edition.forEach(element => {
            element.style.display = null
        });
    }
   
    //ajout listener sur les boutons présents
    openModal(modifyBtn)
    closeModal(closeBtn)



    // Chargement des images projets
    createEditionGallery(works)
}

function createEditionGallery(works){
    const editionGalleryContainer = document.querySelector(".gallery-modal")
    editionGalleryContainer.innerHTML=""
    works.forEach(work =>{
        const workContainer = document.createElement("div")
        workContainer.classList.add("work-container")
        const imageElement = document.createElement("img")
        const trashLogo = document.createElement("i")
        trashLogo.classList.add("fa-solid")
        trashLogo.classList.add("fa-trash-can")
        trashLogo.dataset.id = work.id
        trashLogo.dataset.title = work.title
        imageElement.src = work.imageUrl
        workContainer.appendChild(imageElement)
        workContainer.appendChild(trashLogo)
        editionGalleryContainer.appendChild(workContainer)
    })
}