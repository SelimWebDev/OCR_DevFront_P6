function getPhotographers() {
    const photographers = data.photographers
    return photographers
}

// crééer une userCardDom pour chaque photographe et l'affiche dans photographerSection
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    for(i=0; i<photographers.length; i++){
        const photographerModel = photographerFactory(photographers[i]);
        console.log(photographerModel)
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    }
};

function addEnterListener(){
    document.addEventListener("keydown", (e) => {
        if (e.code == "Enter"){
            document.activeElement.onclick(e)
        }
    })
}

async function init() {
    // Récupère les datas des photographes
    const data = getPhotographers();
    displayData(data);
};

init();
addEnterListener();