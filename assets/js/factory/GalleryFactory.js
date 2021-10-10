import { ImageFactory } from "./ImageFactory";
import { VideoFactory } from "./videoFactory";

export class GaleryFactory {
    create(data, user) {
        let imgOrVideo;
        const name = user.name.split(' ')[0].replace('-', ' ');

        data.media.map((medias) => {
            if (medias.photographerId === user.id) {
                const divSection = document.getElementById('portfolio');
                const divElt = document.createElement('div');
                divElt.className = 'portfolio-item';
                divElt.id = `${medias.id}`
                //Image + Video Factory
                if (medias.image){
                    imgOrVideo = new ImageFactory().createElt(`assets/profil/${name}/${medias.image}`, 'Alt');
                }
                if (medias.video){
                    imgOrVideo = new VideoFactory().createElt(`assets/profil/${name}/${medias.video}`);
                }
        
                const templatePage = `
                <div class="portfolio-item" id="item-${medias.id}">
                    ${imgOrVideo}
                    <div class="profil-item-info" id="info-${medias.id}">
                        <p class="portfolio-name" id="name-${medias.id}">${medias.title}</p>
                        <p class="portfolio-name" id="like-${medias.id}">${medias.likes} <i class="fas fa-heart"></i></p>
                    </div>
                </div>`;
                
                divSection.appendChild(divElt);
                divElt.innerHTML = templatePage;
            }
        })
    }
}