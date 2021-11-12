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
                        <p class="portfolio-name"><span class="like-number" id="like-${media.id}">${media.likes}</span> <em class="far fa-heart like-icon" data-id="${media.id}" id="heart-${media.id}"></em></p>
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
            const gLike = document.getElementById('totalLike');
            const iLike = document.getElementById(`heart-${elt.getAttribute('data-id')}`);
            const like = document.getElementById(`like-${elt.getAttribute('data-id')}`);
            
            let nLike = Number(like.textContent);
            let gnLike = Number(gLike.textContent);

            if(iLike.classList.contains('far')){
                console.log(1);
                iLike.classList.add('fas');
                iLike.classList.remove('far');
                like.textContent = nLike + 1;
                gLike.textContent = gnLike + 1;
            } else {
                console.log(2);
                iLike.classList.add('far');
                iLike.classList.remove('fas');
                like.textContent = nLike - 1;
                gLike.textContent = gnLike - 1;
            }
        }, false));
    }
}