import { MediaFactory } from "./MediaFactory";
import { Carousel } from "../class/Carousel";

export class GaleryFactory {
    create(medias, user) {
        const name = user.name.split(' ')[0].replace('-', ' ');

        medias.map((media) => {
                const divSection = document.getElementById('portfolio');
                const divElt = document.createElement('div');
                divElt.className = 'portfolio-item';
                divElt.id = `${media.id}`

                const mediaHTML = new MediaFactory().render(media, name)
        
                const templatePage = `
                <div class="portfolio-item" id="item-${media.id}">
                    ${mediaHTML}
                    <div class="profil-item-info" id="info-${media.id}">
                        <p class="portfolio-name" id="name-${media.id}">${media.title}</p>
                        <p class="portfolio-name"><span class="like-number">${media.likes}</span> <i class="far fa-heart like-icon" id="like-${media.id}"></i></p>
                    </div>
                </div>`;
                
                divSection.appendChild(divElt);
                divElt.innerHTML = templatePage;
        })

        this.callEvents(medias, name);
        
    }

    callEvents(medias, name){
        const carousel = document.querySelectorAll('.media');
        carousel.forEach(elt => elt.addEventListener('click', function (e) {
            new Carousel(elt.getAttribute('data-id'), medias, name);
        }, false));

        const like = document.querySelectorAll('.like-icon');
        like.forEach(elt => elt.addEventListener('click', function (e) {
            console.log(e.target.classList[0]);
        }, false));
    }
}