function mediaFactory(data) {

    const { id, photographerId, title ,image, likes ,date , price, video } = data
    
    function getMediaCardDOM() {
        const article = document.createElement( 'div' );
        article.setAttribute("class", "mediaBlock")

        let picture = ""
        const imgLayer = document.createElement('div')
        imgLayer.setAttribute("class", "mediaLayer")

        if(image){
            picture = `./assets/images/${photographerId}/${image}`;
            const img = document.createElement( 'img' );
            img.setAttribute("class", "mediaImg")
            img.setAttribute("src", picture)
            img.setAttribute("alt", title)
            img.setAttribute("tabindex", "0")
            imgLayer.appendChild(img)

        } else if(video){
            picture = `./assets/images/${photographerId}/${video}`;
            const videoHtml = document.createElement( 'video' );
            videoHtml.setAttribute("class", "mediaImg")
            videoHtml.setAttribute("src", picture)
            videoHtml.setAttribute("alt", "un média du photographe")
            videoHtml.setAttribute("tabindex", "0")
            imgLayer.appendChild(videoHtml)
        }

        const textLayer = document.createElement('div')
        textLayer.setAttribute("class", "textLayer")

        const titleSpan = document.createElement( 'span' );
        titleSpan.setAttribute("class", "titleMedia")
        titleSpan.textContent = title;

        const likeIcon = document.createElement('i')
        likeIcon.setAttribute('class', 'fas fa-heart likeIconMedia')
        likeIcon.setAttribute('aria-label', 'icone de like')
        likeIcon.dataset.liked = false
        
        const likeSpan = document.createElement('span')
        likeSpan.setAttribute('class', 'likeSpan')
        const likeDiv = document.createElement ( 'div' )
        likeDiv.setAttribute('class', 'likeDiv')

        likeSpan.textContent = likes
        likeDiv.appendChild(likeSpan)
        likeDiv.appendChild(likeIcon)

        textLayer.appendChild(titleSpan);
        textLayer.appendChild(likeDiv)

        article.appendChild(imgLayer)
        article.appendChild(textLayer)
        return (article);
    }
    return { getMediaCardDOM }
}