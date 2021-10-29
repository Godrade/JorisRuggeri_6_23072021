import { MediaFactory } from "../factory/MediaFactory";
export class Carousel {

    init(id, medias, name){
        const modal = document.getElementById('carousel');
        const carousel = document.getElementById('media-carousel');
        let index;
        let mediaLenght = medias.length -1
        Array.prototype.indexOfField = function (propertyName, value) {
            for (var i = 0; i < this.length; i++)
                if (this[i][propertyName] === value)
                    return i;
            return -1;
        }

        index = medias.indexOfField('id', Number(id))
        this.update(medias[index], name)
        this.callEvents(index, mediaLenght, name, medias);

        modal.style.display = 'block'
        document.getElementById('close-modal').addEventListener('click', (e) => {
            modal.style.display = 'none';
        })
    }

    callEvents(index, mediaLenght, name, medias){
        
        const cLeft = document.getElementById('chevron-left');
        const cRight = document.getElementById('chevron-right');


        window.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowLeft'){
                index = this.before(mediaLenght, index);
                console.log(`Index: ${index}/${mediaLenght}`);
                this.update(medias[index], name)
            }

            if(e.key === 'ArrowRight'){
                index = this.next(mediaLenght, index);
                console.log(`Index: ${index}/${mediaLenght}`);
                this.update(medias[index], name)
            }
        }, false);

        cLeft.addEventListener('click', (e) => {
            index = this.before(mediaLenght, index);
            console.log(`Index: ${index}/${mediaLenght}`);
            this.update(medias[index], name)
        })

        cRight.addEventListener('click', (e) => {
            index = this.next(mediaLenght, index);
            console.log(`Index: ${index}/${mediaLenght}`);
            this.update(medias[index], name)
        })
    }

    update(media, name){
        const carousel = document.getElementById('media-carousel');
        carousel.innerHTML = new MediaFactory().render(media, name)
    }

    next(arrayLenght, index){
        if (index >= arrayLenght){
            index = 0;
        } else {
            index = index +1;
        }

        return index;
    }

    before(arrayLenght, index){
        if (index <= 0){
            index = arrayLenght;
        } else {
            index = index -1;
        }

        return index;
    }
}