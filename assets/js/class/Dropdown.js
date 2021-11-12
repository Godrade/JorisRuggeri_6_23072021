import { GaleryFactory } from "../factory/GalleryFactory";
import { Photographer } from "./photographer";

export class Dropdown {
    constructor(user, data){
        this.totalLike = document.getElementById('totalLike')
        this.dropdownBtn = document.getElementById('dropDownBtn')
        this.dropMenu = document.getElementById('select-hide')
        this.dropList = document.querySelectorAll('.filter')
        this.filterName = document.getElementById('filter-name')

        this.callEvents(user, data)
        this.updateSort(null, user, data)

    }

    callEvents(user, data){
        this.dropdownBtn.addEventListener('click', (e) =>{
            if(this.dropMenu.style.display == 'none' || this.dropMenu.style.display == ""){
                this.dropMenu.style.display = 'block';
            } else {
                this.dropMenu.style.display = 'none';
            }
        })

        this.dropList.forEach(list => {
            list.addEventListener('click', () =>{
                this.updateSort(list.getAttribute('data-filter'), user, data);
                this.filterName.textContent = list.id
            })
        })
    }
    
    updateSort(sort, user, data) {
        let newMedia;
        const media = this.getMedia(data, user.id);
        this.totalLike.textContent = new Photographer().getTotalLike(data, user.id);
        switch (sort) {
            case "orderByLike":
                newMedia = media.sort(function(a, b) {
                    return b.likes - a.likes;
                })
                break;
            case "orderByName":
                newMedia = media.sort(function(x, y) {
                    let a = x.title.toUpperCase(),
                        b = y.title.toUpperCase();
                    return a == b ? 0 : a > b ? 1 : -1;
                })
                break;
            case "orderByDate":
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