import { GaleryFactory } from "../factory/GalleryFactory";

export class Dropdown {
    constructor(user, data){
        this.callEvents(user, data)
        this.updateSort(null, user, data)
    }

    callEvents(user, data){
        const selectedFiltrerIndex = document.getElementById('selectFiltre');
        selectedFiltrerIndex.addEventListener('change', () => {
            this.updateSort(selectedFiltrerIndex.selectedIndex, user, data);
        })
    }
    
    updateSort(sort, user, data) {
        let newMedia;
        const media = this.getMedia(data, user.id);
        switch (sort) {
            case 1:
                newMedia = media.sort(function(a, b) {
                    return b.likes - a.likes;
                })
                break;
            case 2:
                newMedia = media.sort(function(x, y) {
                    let a = x.title.toUpperCase(),
                        b = y.title.toUpperCase();
                    return a == b ? 0 : a > b ? 1 : -1;
                })
                break;
            case 3:
                newMedia = media.sort(function(x, y) {
                    let a = new Date(x.date),
                        b = new Date(y.date);
                    return a - b;
                })
                break;
            default:
                newMedia = media;
                break;
        }

        this.displayMedia(newMedia, user);
    }

    displayMedia(media, user){
        this.remove();
        new GaleryFactory().create(media, user);
    }

    //Remove Dom element
    remove() {
        let portfolioDomItem = document.querySelectorAll('.portfolio-item');
        portfolioDomItem.forEach(element => {
            element.remove();
        })
    }

    getMedia(data, userID) {
        let media = [];
        data['media'].forEach(element => {
            if (element.photographerId === userID) {
                media.push(element)
            }
        })
        return media;
    }
}