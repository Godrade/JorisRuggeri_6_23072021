import { MediaFactory } from "../factory/MediaFactory";
export class Carousel {

    constructor(id, medias, name){
        this.id = id;
        this.medias = medias;
        this.name = name;

        this.index = medias.findIndex((element) => element.id === Number(id))
        this.mediaLenght = medias.length -1

        this.cLeft = document.getElementById('chevron-left');
        this.cRight = document.getElementById('chevron-right');
        this.modal = document.getElementById('carousel');
        this.carousel = document.getElementById('media-carousel');
        this.carouselTitle = document.getElementById('carousel-media-name');

        this.update();
        this.callEvents();
    }

    callEvents(){
        this.modal.style.display = 'block'
        document.getElementById('close-modal').addEventListener('click', (e) => {
            this.modal.style.display = 'none';
        })

        window.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowLeft'){
                this.index = this.before();
                this.update()
            }

            if(e.key === 'ArrowRight'){
                this.index = this.next();
                this.update()
            }
        }, false);

        this.cLeft.addEventListener('click', (e) => {
            this.index = this.before();
            this.update()
        })

        this.cRight.addEventListener('click', (e) => {
            this.index = this.next();
            this.update()
        })
    }

    update(){
        let currentMedias = this.medias[this.index];
        this.carousel.innerHTML = new MediaFactory().render(currentMedias, this.name)
        this.carouselTitle.textContent = currentMedias.title;
    }

    next(){
        return this.index >= this.mediaLenght ? 0 : this.index +1;
    }

    before(){
        return this.index <= 0 ? this.mediaLenght : this.index -1;
    }
}