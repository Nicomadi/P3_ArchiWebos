import { categories } from "./filters.js"

let isAddPhoto = false
let isphotoOk = false
let isTitleOk = false
let isCategoryOk = false
// Taille maximale de la photo en octets
const photoMaxSize = 4*1024*1024

const modal = document.getElementById("modal-Id")
const modifyBtn = document.querySelector(".modify-btn")
const closeBtn = document.querySelector(".close-modal-button")
const previousBtn = document.querySelector(".previous-modal-button")
const edition = document.querySelectorAll(".edition-classe")
const header = document.getElementById("header")
const modalBtn = document.querySelector(".modal-button")
const titleModal = document.getElementById("title-modal")
const editionGalleryContainer = document.querySelector(".edit-gallery-container")
const addPhotoContainer = document.querySelector(".add-photo-container")
const addFileInput = document.getElementById("add-photo-input") 
const photAreaNoFile = document.querySelector(".add-photo-area-no-file")
const uploadPhotoArea = document.querySelector(".add-photo-area")
const categorySelect = document.querySelector(".category-select")
const titleInput = document.getElementById("add-photo-title")


function openModal(btn){
    modalElementManagement(isAddPhoto)
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
        isAddPhoto = false
        modalElementManagement(isAddPhoto)
        modal.style.display = "none"
        modal.removeAttribute("aria-modal")
        modal.setAttribute("aria-hidden", "true")
        clearAddPhotoInputs()
    })
}

function previousModal(){
    previousBtn.addEventListener("click", ()=>{
        isAddPhoto = false
        modalElementManagement(isAddPhoto)
        clearAddPhotoInputs()
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
    previousModal()
    modalElementManagement(isAddPhoto)
    addInputsListener()

    

    // Chargement des images projets
    createEditionGallery(works)

    //Gestion categorie liste déroulante
    addCategoriesToSelect()
}

function createEditionGallery(works){
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
        trashLogo.addEventListener("click",(event)=>deleteElement(event))
        imageElement.src = work.imageUrl
        workContainer.appendChild(imageElement)
        workContainer.appendChild(trashLogo)
        editionGalleryContainer.appendChild(workContainer)
    })
}

// TO DO Supprimer des galleries le projet supprimé
function deleteElement(event){
    console.log(sessionStorage.getItem("token"))
    event.preventDefault()
    if (confirm("Voulez-vous supprimer cet élément ?")) {
        fetch(`http://localhost:5678/api/works/${event.target.dataset.id}`,{
            method : "DELETE",
            headers : { "accept" : '*/*',
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    }
        }).then()
    }
}

// Fonctions relatives au bouton de la modale
function switchToAddPhotoViewBtn(event){
        event.preventDefault()
        isAddPhoto =true
        modalElementManagement(isAddPhoto)
    }

    const modalForm = document.querySelector(".modal-form")
    let binaryData
function sendPhoto(event){
    event.preventDefault()
    console.log(binaryData)
    const newWork = new FormData()
    /* const newWork = {
        image : addFileInput.files[0],
        title : titleInput.value,
        category : parseInt(categorySelect.options[categorySelect.selectedIndex].value)
    } */
    newWork.append("image" , addFileInput.files[0] )
    newWork.append("title" , titleInput.value)
    newWork.append("category" , parseInt(categorySelect.options[categorySelect.selectedIndex].value))
    console.log(newWork)
    /* fetch(`http://localhost:5678/api/works`, {
        method : "POST",
        headers : {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,        
        body : newWork
        }
    }).then(response => response.json()).then(data => console.log(data)) */

}

function modalElementManagement(isAddPhoto){
    if (isAddPhoto) {
        editionGalleryContainer.style.display= "none"
        addPhotoContainer.style.display = null
        titleModal.textContent="Ajout Photo"
        previousBtn.hidden = false
        modalBtn.disabled=true
        modalBtn.textContent="Valider"
        modalForm.addEventListener("submit", sendPhoto)
        modalBtn.removeEventListener("click", switchToAddPhotoViewBtn)
    } else {
        editionGalleryContainer.style.display= null
        addPhotoContainer.style.display = "none"
        titleModal.textContent="Galerie photo"
        previousBtn.hidden = true
        modalBtn.disabled=false
        modalBtn.textContent="Ajouter une photo"
        modalBtn.addEventListener("click",switchToAddPhotoViewBtn)
        modalForm.removeEventListener("submit", sendPhoto)
    }
}

function addCategoriesToSelect(){
    for (let i = 1; i < categories.length; i++) {
        const categoryOption = document.createElement("option")
        categoryOption.value = categories[i].id
        categoryOption.textContent = categories[i].name
        //categoryOption.dataset.id = categories[i].id
        categorySelect.appendChild(categoryOption)
    }
}

function comparePhotoSize(photo){
    if (photo[0].size > photoMaxSize) {
        isphotoOk = false
        alert("Veuillez choisir une image de 4mo maximum")
    } else {
        isphotoOk = true
        const uploadedPhoto = document.createElement("img")
        uploadedPhoto.src = window.URL.createObjectURL(photo[0])
        uploadPhotoArea.appendChild(uploadedPhoto)
        photAreaNoFile.style.opacity = 0
        checkInput()
    }
} 

function checkInput() {
    //console.log(`photo ${isphotoOk} / title ${isTitleOk} / category ${isCategoryOk}`)
    if (isphotoOk && isTitleOk && isCategoryOk) {
        modalBtn.disabled=false
    }
}
 
function addInputsListener() {
    addFileInput.addEventListener("change", (event)=>{
        comparePhotoSize(event.target.files)
    })

    titleInput.addEventListener("change", ()=>{
        if (titleInput.value !== "") {
            isTitleOk = true
            checkInput()
        }else{ 
            isTitleOk = false
        }
    } )

    categorySelect.addEventListener("change", () =>{
        if (categorySelect.options[categorySelect.selectedIndex].value !== "") {
            isCategoryOk = true
            checkInput()
        }else{ isCategoryOk = false}
    })
}

function clearAddPhotoInputs(){
    // Efface le champs de saisie de titre
    titleInput.value=""

    // Replace la liste déroulante sur le premier élément
    categorySelect.selectedIndex = 0

    // Réinitialise la partie ajout de photo
    photAreaNoFile.style.opacity = 1
    const img = document.querySelector(".add-photo-area>img")
    if( uploadPhotoArea.contains(img)){
        uploadPhotoArea.removeChild(img)
    }
}