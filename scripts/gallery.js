//Récupération des éléments du DOM
const gallery = document.querySelector(".gallery")

//Création des éléments dans la gallerie à partir d'une liste de travaux
export function galleryElementCreation(works){
    
    gallery.innerHTML=""
    works.forEach(work => {
        const figureElement = document.createElement("figure")
        figureElement.dataset.categoryId = work.categoryId
        const imageElement = document.createElement("img")
        imageElement.src = work.imageUrl
        const figCaptionElement = document.createElement("figcaption")
        figCaptionElement.textContent = work.title
        figureElement.appendChild(imageElement)
        figureElement.appendChild(figCaptionElement)
        gallery.appendChild(figureElement)
    });
}