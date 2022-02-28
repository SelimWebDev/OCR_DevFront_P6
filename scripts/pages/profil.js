
// recupérer id url params
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

function getPhotographers() {
    const photographers = data.photographers
    return photographers
}

// return photographer correspondant à l'id dans l'url
function getById() { 
    const photographers = getPhotographers();
    let photographer = {}
    for(let i=0; i<photographers.length;i++){
        if(photographers[i].id == id){
            photographer = photographers[i]
        }
    }
    return photographer
};

// return array of media
function getMediaById(){
    const medias = data.media
    
    const filteredMedia = []
    for(i=0; i< medias.length; i++){
        if (medias[i].photographerId == id){
            filteredMedia.push(medias[i])
        }
    }
    return filteredMedia
}
 
// insert mediaCardDom to the Dom
function displayMedia(medias){
    const mediaSection = document.querySelector('.mediaSection')
    for(i=0; i< medias.length; i++){
        const mediaModel = mediaFactory(medias[i])
        const mediaCardDom = mediaModel.getMediaCardDOM()
        mediaSection.appendChild(mediaCardDom)
    }
}

function displayTotalLike(totalLike){
    const icon = document.createElement('i')
    icon.setAttribute('class', 'fas fa-heart')

    totalLikeSpan = document.getElementById("totalLikeSpan")
    totalLikeSpan.textContent = totalLike
    totalLikeSpan.appendChild(icon)
}

function computeTotalLike(medias){
    let totalLike = 0 
    for(i=0; i<medias.length;i++){
        totalLike += medias[i].likes
    }
    return totalLike
}

function addLikeListener(totalLike){
    likesIcone = document.getElementsByClassName("likeIconMedia")
    likesSpan = document.getElementsByClassName("likeSpan")
    for(let i=0; i<likesIcone.length;i++){
        likesIcone[i].addEventListener('click', () => {
            if(likesIcone[i].dataset.liked == 'false'){
                medias = getMediaById()
                medias[i].likes+=1                              //incrémente data.likes
                totalLike +=1
                likesIcone[i].dataset.liked = 'true'
                likesSpan[i].textContent = medias[i].likes                          // on réaffiche les like
                displayTotalLike(totalLike)
                console.log("like")
            }
            else if(likesIcone[i].dataset.liked == 'true'){
                medias = getMediaById()
                medias[i].likes-=1                              //incrémente data.likes
                totalLike -=1
                likesIcone[i].dataset.liked = 'false'
                likesSpan[i].textContent = medias[i].likes                          // on réaffiche les like
                displayTotalLike(totalLike)
                console.log("dislike")
            }
        })
    }
}

function openModal(src, index){
    modal = document.getElementById('modal-media')
    let fileNameArray = src.split('.')
    let fileExt = fileNameArray[fileNameArray.length - 1]
    console.log(fileExt)

    modal.style.display = "block"
    if(fileExt == 'mp4'){
        imgContain = document.getElementById('img-modal')
        imgContain.style.display = "none"

        videoContain = document.getElementById("video-modal")
        videoContain.style.display = "block"
        videoContain.src = src
        videoContain.dataset.index = index
    } else {
        videoContain = document.getElementById('video-modal')
        videoContain.style.display = "none"

        imgContain = document.getElementById('img-modal')
        imgContain.style.display = "block"
        imgContain.src = src
        imgContain.dataset.index = index
    }

}

function addClickListener(){
    images = document.getElementsByClassName('mediaImg')
    for(let i = 0; i < images.length; i++){
        images[i].addEventListener('click', (event) => {
            openModal(event.target.src, i)
        })
        images[i].addEventListener('keydown', (event) => {
            if(event.code =="Enter"){
                openModal(event.target.src, i)
            }
        })
    }
}


// met a jour la bottom bar avec le prix total et €/jour du photographe
function displayBottomBar(totalLike, photographer){
    const icon = document.createElement('i')
    icon.setAttribute('class', 'fas fa-heart')

    totalLikeSpan = document.getElementById("totalLikeSpan")
    totalLikeSpan.textContent = totalLike
    totalLikeSpan.appendChild(icon)

    priceSpan = document.getElementById("priceSpan")
    priceSpan.textContent = photographer.price + "€ / jour"
}

function addCloseListener(){
    modal = document.getElementById('modal')
    closeButton = document.getElementById('closeButton')
    closeButton.addEventListener('click', () => {
        modal.style.display = "none"    
    })

    closeButton.addEventListener('keydown', (e) => {
        if(e.code == 'Enter'){
            modal.style.display = "none" 
        }
    })
}

function addModalSwitchListener(medias){
    previousButton = document.getElementById("previous-button")
    nextButton = document.getElementById("next-button")

    let image = document.getElementById('img-modal')
    let video = document.getElementById('video-modal')

    previousButton.addEventListener('click', () => {    //listen click
        let index = parseInt(image.dataset.index)
        if(index > 0){
            if(medias[index - 1].image != undefined){
                image.src = `./assets/images/${id}/` + medias[index - 1].image
                image.dataset.index = index - 1
                video.style.display = "none"
                image.style.display = "block"
            } else {
                video.src = `./assets/images/${id}/` + medias[index - 1].video
                image.dataset.index = index - 1
                image.style.display = "none"
                video.style.display = "block"
            }   
            
            console.log("précédent") 
        }
    })

    previousButton.addEventListener('keydown', (e) => {
        if(e.code == 'Enter'){
            let index = parseInt(image.dataset.index)
            if(index > 0){
                if(medias[index - 1].image != undefined){
                    image.src = `./assets/images/${id}/` + medias[index - 1].image
                    image.dataset.index = index - 1
                    video.style.display = "none"
                    image.style.display = "block"
                } else {
                    video.src = `./assets/images/${id}/` + medias[index - 1].video
                    image.dataset.index = index - 1
                    image.style.display = "none"
                    video.style.display = "block"
                }
            }
        }
    })

    nextButton.addEventListener('click', () => {
        let index = parseInt(image.dataset.index)
        if(index < medias.length - 1){
            if(medias[index + 1].image != undefined){
                image.src = `./assets/images/${id}/` + medias[index + 1].image
                image.dataset.index = index + 1
                video.style.display = "none"
                image.style.display = "block"
            } else {
                video.src = `./assets/images/${id}/` + medias[index + 1].video
                image.dataset.index = index + 1
                image.style.display = "none"
                video.style.display = "block"
            }
        }
    })

    nextButton.addEventListener('keydown', (e) => {
        if(e.code == 'Enter'){
            let index = parseInt(image.dataset.index)
            if(index < medias.length - 1){
                if(medias[index + 1].image != undefined){
                    image.src = `./assets/images/${id}/` + medias[index + 1].image
                    image.dataset.index = index + 1
                    video.style.display = "none"
                    image.style.display = "block"
                } else {
                    video.src = `./assets/images/${id}/` + medias[index + 1].video
                    image.dataset.index = index + 1
                    image.style.display = "none"
                    video.style.display = "block"
                }
            }
        }
    })

    document.addEventListener('keydown', (e) => {
        if(e.code == "ArrowRight"){
            let index = parseInt(image.dataset.index)
            if(index < medias.length - 1){
                if(medias[index + 1].image != undefined){
                    image.src = `./assets/images/${id}/` + medias[index + 1].image
                    image.dataset.index = index + 1
                    video.style.display = "none"
                    image.style.display = "block"
                } else {
                    video.src = `./assets/images/${id}/` + medias[index + 1].video
                    image.dataset.index = index + 1
                    image.style.display = "none"
                    video.style.display = "block"
                }
                console.log("suivant")
            }
        } else if (e.code == "ArrowLeft"){
            let index = parseInt(image.dataset.index)
            if(index > 0){
                if(medias[index - 1].image != undefined){
                    image.src = `./assets/images/${id}/` + medias[index - 1].image
                    image.dataset.index = index - 1
                    video.style.display = "none"
                    image.style.display = "block"
                } else {
                    video.src = `./assets/images/${id}/` + medias[index - 1].video
                    image.dataset.index = index - 1
                    image.style.display = "none"
                    video.style.display = "block"
                }
                console.log("précédent") 
            }
        }
    })
}

function filterByLike(){
    medias.sort(function (a, b) {
        return b.likes - a.likes;
    });
}

function filterByName(){
    medias.sort(function (a, b) {
        return a.title.localeCompare(b.title)
    })
}

function addFilterListener(){
    const select = document.getElementById("filter-select")
    const mediaSection = document.querySelector('.mediaSection')

    select.addEventListener("change", (e) => {
        if(e.target.value == "title"){
            filterByName()
        } else if (e.target.value == "popularity"){
            filterByLike()
        }
        mediaSection.innerHTML = ""                 // on efface le contenue
        displayMedia(medias)
    })
}

function addContactListener(){
    const button = document.getElementById("send_button")
    const firstName = document.getElementById("firstname")
    const lastName = document.getElementById("lastname")
    const email = document.getElementById("email")
    const message = document.getElementById("message")


    button.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(firstName.value)
        console.log(lastName.value)
        console.log(email.value)
        console.log(message.value)
    })
}

let photographer = getById()    //objet photogrpahe
let medias = getMediaById()     //objet media séléctionné
let totalLike = computeTotalLike(medias)

photographerModel = photographerFactory(photographer)
photographerModel.getHeaderDom()
photographerModel.setNameForm()

displayMedia(medias)
displayBottomBar(totalLike, photographer)

addLikeListener(totalLike)
addClickListener()
addCloseListener()
addModalSwitchListener(medias)
addFilterListener()
addContactListener()
