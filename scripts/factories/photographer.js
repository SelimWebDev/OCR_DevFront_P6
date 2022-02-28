function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );

        const link = document.createElement('a');
        link.href = './profil.html?id=' + id;
        link.setAttribute("class", "photographerLink")
        link.setAttribute("tabindex", "0")

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const locationSpan = document.createElement ('span')
        locationSpan.setAttribute("class", "locationSpan")
        locationSpan.textContent = city + ", " + country 

        const taglineSpan = document.createElement( 'span' )
        taglineSpan.setAttribute("class", "taglineSpan")
        taglineSpan.textContent = tagline

        const priceSpan = document.createElement( 'span' )
        priceSpan.setAttribute("class", "priceSpan")
        priceSpan.textContent = price + "€/jour"

        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(locationSpan)
        link.appendChild(taglineSpan)
        link.appendChild(priceSpan)
        article.appendChild(link)
        return (article);
    }

    function getHeaderDom(){

        const picture = `assets/photographers/${portrait}`;
    
        const left_contain = document.querySelector(".left_contain");
        const right_contain = document.querySelector(".right_contain");
    
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)

        const nameSpan = document.createElement( 'span' );
        nameSpan.setAttribute('class', 'nameSpan')
        nameSpan.textContent = name;

        const locationSpan = document.createElement('span');
        locationSpan.setAttribute('class', 'locationSpan')
        locationSpan.textContent = city + ", " + country;

        const taglineSpan = document.createElement('span');
        taglineSpan.setAttribute('class', 'taglineSpan')
        taglineSpan.textContent = tagline
    
        left_contain.appendChild(nameSpan);
        left_contain.appendChild(locationSpan);
        left_contain.appendChild(taglineSpan);
        right_contain.appendChild(img);
    }

    function setNameForm(){
        const nameForm = document.getElementById("name-form")
        nameForm.textContent = name
    }

    return { getUserCardDOM, getHeaderDom, setNameForm }
}