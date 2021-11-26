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
            this.toggleDropDown();
        })

        this.dropList.forEach(list => {
            list.addEventListener('click', () =>{
                this.updateSort(list.getAttribute('data-filter'), user, data);
                this.filterName.textContent = list.id
            })
        })

        const listbox = document.querySelector('[role="listbox"]')
        const characters = [...listbox.children]

        listbox.addEventListener('click', event => {
        const option = event.target.closest('li')
        if (!option) return

        option.focus()

        // Sets aria-activedescendant value
        listbox.setAttribute('aria-activedescendant', option.id)

        // Change visual appearance
        characters.forEach(element => element.classList.remove('is-selected'))
        option.classList.add('is-selected')
        })

        listbox.addEventListener('keydown', event => {
            console.log(event);

            const { key } = event
            if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Enter') return
          
            const activeElementID = listbox.getAttribute('aria-activedescendant')
            const activeElement = listbox.querySelector('#' + activeElementID)
          
            let selectedOption
            console.log({ key });
            if (key === 'ArrowDown') selectedOption = activeElement.nextElementSibling
            if (key === 'ArrowUp') selectedOption = activeElement.previousElementSibling
            if (key === 'Enter') {
                this.updateSort(event.target.getAttribute('data-filter'), user, data);
                this.filterName.textContent = event.target.id
                this.toggleDropDown();
            }
          
            if (selectedOption) {
              // Sets aria-activedescendant value
              listbox.setAttribute('aria-activedescendant', selectedOption.id)
          
              // Change visual appearance
              characters.forEach(element => element.classList.remove('is-selected'))
              selectedOption.classList.add('is-selected')

              selectedOption.focus()
                characters.forEach(element => { element.setAttribute('tabindex', -1) })
                selectedOption.setAttribute('tabindex', 0)
            }
          })
    }
    
    toggleDropDown() {
        console.log("toogle", this);
        if (this.dropMenu.style.display == 'none' || this.dropMenu.style.display == "") {
            this.dropMenu.style.display = 'block';
        } else {
            this.dropMenu.style.display = 'none';
        }
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