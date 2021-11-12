import { Modal } from "./Modal";
export class Photographer {
    create = (data) => {
        const user = this.getUser(data);
        
        const templatePage = `
            <div class="content-user">
                <div class="profil-info">
                    <div class="p-relative">
                        <h1 class="user-name" id="name">${user.name}</h1>
                        <button class="btn btn-contact" id="modal-btn">Contactez-moi</button>
                    </div>
                    <h2 class="user-city" id="city">${user.city}</h2>
                    <p class="user-desc" id="desc">${user.tagline}</p>
                </div>
                <div class="user">
                    <img alt="Image de profil" id="img-profil" src="assets/profil/Photographers ID Photos/${user.portrait}">
                </div>
            </div>
        `;

        // <div class="user-tag" id="user-tag">
        //     ${user.tags.map((tag) => `<div class="tag"><span>#${tag}</span></div>`).join("")}
        // </div>

        document.getElementById('profil').innerHTML = templatePage;
        document.getElementById('contact-name').textContent = user.name;
        document.getElementById('user-price').textContent = user.price;
        document.getElementById('totalLike').textContent = this.getTotalLike(data, user.id);

        //Call Events
        this.callEvents();
    };

    callEvents(){
        const modalBtn = document.getElementById('modal-btn');
        modalBtn.addEventListener('click', function () {
            new Modal().modal({ open: true });
        })
    }

    getTotalLike(data, userID){
        let totalLike = 0;
        data.media.map((medias) => {
            if (medias.photographerId === userID) {
                totalLike = totalLike + medias.likes;
            }
        })
        return totalLike;
    }

    updateLike(elt){
        const totalLike = document.getElementById('totalLike');
        const iconLike = document.getElementById(`heart-${elt.getAttribute('data-id')}`);
        const numberlike = document.getElementById(`like-${elt.getAttribute('data-id')}`);

        if(iconLike.classList.contains('far')){
            iconLike.classList.add('fas');
            iconLike.classList.remove('far');
            numberlike.textContent = Number(numberlike.textContent) + 1;
            totalLike.textContent = Number(totalLike.textContent) + 1;
        } else {
            iconLike.classList.add('far');
            iconLike.classList.remove('fas');
            numberlike.textContent = Number(numberlike.textContent) - 1;
            totalLike.textContent = Number(totalLike.textContent) - 1;
        }
    }

    getUser(data){
        const userID = window.location.href.split('?id=')[1];
        return data.photographers.find(photographer => photographer.id === Number(userID));
    }
}