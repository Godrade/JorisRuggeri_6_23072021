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
                <div class="portfolio-item media" id="item-${media.id}" data-id="${media.id}">
                    ${mediaHTML}
                    <div class="profil-item-info" id="info-${media.id}">
                        <p class="portfolio-name" id="name-${media.id}">${media.title}</p>
                        <p class="portfolio-name" id="like-${media.id}">${media.likes} <i class="fas fa-heart"></i></p>
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
            new Carousel().init(elt.getAttribute('data-id'), medias, name);
        }, false));
    }
}