import { MediaFactory } from "../factory/MediaFactory";
export class Carousel {

    init(id, medias){
        let media;
        let mediaLenght = medias.length -1
        let alpha = document.getElementById('imgtest');
        Array.prototype.indexOfField = function (propertyName, value) {
            for (var i = 0; i < this.length; i++)
                if (this[i][propertyName] === value)
                    return i;
            return -1;
        }

        media = medias.indexOfField('id', Number(id))
        alpha.innerHTML = this.update(medias[media], 'Mimi');

        window.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowRight'){
                media = this.next(mediaLenght, media);
                console.log(`Index: ${media}/${mediaLenght}`);
                alpha.innerHTML = this.update(medias[media], 'Mimi');
            }

            if(e.key === 'ArrowLeft'){
                media = this.before(mediaLenght, media);
                console.log(`Index: ${media}/${mediaLenght}`);
                alpha.innerHTML = this.update(medias[media], 'Mimi');
            }
          }, false);
    }

    update(media, name){
        return new MediaFactory().render(media, name)
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