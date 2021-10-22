import { MediaFactory } from "./MediaFactory";
import { Carousel } from "../class/Carousel";

export class GaleryFactory {
    create(medias, user) {
        const name = user.name.split(' ')[0].replace('-', ' ');
        const mediaFactory = new MediaFactory();

        medias.map((media) => {
                const divSection = document.getElementById('portfolio');
                const divElt = document.createElement('div');
                divElt.className = 'portfolio-item';
                divElt.id = `${media.id}`

                const mediaHTML = mediaFactory.render(media, name)
        
                const templatePage = `
                <div class="portfolio-item" id="item-${media.id}" data-id="${media.id}">
                    ${mediaHTML}
                    <div class="profil-item-info" id="info-${media.id}">
                        <p class="portfolio-name" id="name-${media.id}">${media.title}</p>
                        <p class="portfolio-name" id="like-${media.id}">${media.likes} <i class="fas fa-heart"></i></p>
                    </div>
                </div>`;
                
                divSection.appendChild(divElt);
                divElt.innerHTML = templatePage;
        })

        this.callEvents();
        
    }

    callEvents(){
        const carousel = document.querySelectorAll('.portfolio-item');
        carousel.forEach(elt => elt.addEventListener('click', () => {
            return new Carousel().init(elt.getAttribute('data-id'));
        }, false));
    }
}