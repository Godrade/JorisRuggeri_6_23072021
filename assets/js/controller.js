let profil = new ProfilClass();
let url = window.location.pathname;

import { Data } from "./class/data";
import { HomePage } from "./class/homePage";
import { FilterTags } from "./class/FilterTags";
import { Photographer } from "./class/photographer";
import { ProfilClass } from "./class/ProfilClass";
import { Modal } from "./class/modal";
import { Form } from "./class/form";

//Factory
import { ImageFactory } from "./factory/ImageFactory"

(async function init () {
    const data = await new Data().getJson();

    if(url === "/" || url === "/Formation/DFE/FishEye/"){
        new HomePage().create(data);

        //Call filterTag
        const tagList = document.querySelectorAll("button");
        tagList.forEach((filterTag) => filterTag.addEventListener("click", () => new FilterTags().filter(filterTag.id, data)));
    } else {
        new Photographer().create(data);
        new ImageFactory().image(true);

        //BUG MODAL
        

        
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            this.validate();
        });


        const dropbtn = document.getElementById('dropbtn');
        dropbtn.addEventListener('click', () => {
            document.getElementById("dropdown").classList.toggle("show");
        })

        window.onclick = function (e) {
            if (!e.target.matches('.dropbtn')) {
                let dropdowns = document.getElementsByClassName("dropdown-content");
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }

        const orderByLike = document.getElementById('orderByLike');
        orderByLike.addEventListener('click', () => profil.createPortfolioElement(orderByLike.id, window.location.href.split('?id=')[1]));

        const orderByName = document.getElementById('orderByName');
        orderByName.addEventListener('click', () => profil.createPortfolioElement(orderByName.id, window.location.href.split('?id=')[1]));

        const orderByDate = document.getElementById('orderByDate');
        orderByDate.addEventListener('click', () => profil.createPortfolioElement(orderByDate.id, window.location.href.split('?id=')[1]));
    }
})()