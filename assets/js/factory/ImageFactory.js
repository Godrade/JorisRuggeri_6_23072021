export class ImageFactory{
    createElt(element, name){
        return `<img src="assets/profil/${name}/${element.image}" alt="${element.alt}" data-id="${element.id}" tabindex="0" class="media"/>`
    }
}