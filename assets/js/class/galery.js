class Galery {
        create(params) {
            media.map((medias) => {
                const divSection = document.getElementById('portfolio');
                const divElt = document.createElement('div');
                divElt.className = 'portfolio-item';
                divElt.id = `${medias.id}`
    
                totalLike = totalLike + medias.likes;
    
                if (medias.image){imgOrVideo = `<img src="assets/profil/${name}/${medias.image}" alt="Photo de Mimi Keel"></img>`}
                if (medias.video){imgOrVideo = `<video><source src="assets/profil/${name}/${medias.video}" type="video/mp4"></source></video>`}
    
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
                spanLike.textContent = totalLike;
            })
        }
}