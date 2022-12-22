import { Modal } from "./Modal";
export class Photographer {
    create = (data) => {
        const user = this.getUser(data);
        
        const templatePage = `
            <div class="content-user">
                <div class="profil-info">
                    <div class="p-relative">
                        <h1 class="user-name" id="name" role="heading">${user.name}</h1>
                        <!-- MODAL -->
                        <button class="btn btn-contact" id="modal-btn" role="button" aria-label="Contact Me">Contactez-moi</button>
                        <div class="bground" id="bground" aria-labelledby="contact-name" role="dialog">
                            <div class="content">
                                <span class="close" aria-label="Close Contact form" role="button"></span>
                                <div class="modal-body">
                                    <form id="form" name="contact" action="profil.html" method="get">
                                        <h2 role="heading">Contactez-moi <span id="contact-name"></span></h2>
                                        <div class="formData">
                                            <label for="form_firstName">Prénom</label><br>
                                            <input class="text-control" type="text" id="form_firstName" name="form_firstName"
                                                minlength="2" role="text" />
                                            <span class="text-error" id="firstName-error"></span><br>
                                        </div>
                                        <div class="formData">
                                            <label for="form_lastName">Nom</label><br>
                                            <input class="text-control" type="text" id="form_lastName" name="form_lastName" role="text"/>
                                            <span class="text-error" id="lastName-error"></span><br>
                                        </div>
                                        <div class="formData">
                                            <label for="form_email">E-mail</label><br>
                                            <input class="text-control" type="email" id="form_email" name="form_email" role="text"/>
                                            <span class="text-error" id="email-error"></span><br>
                                        </div>
                                        <div class="formData">
                                            <label for="form_message">Votre message</label><br>
                                            <textarea class="text-control" id="form_message" name="form_message"
                                                    rows="5" role="text"></textarea>
                                            <span class="text-error" id="quantity-error"></span><br>
                                        </div>
                                        <button class="btn-submit button" type="submit" aria-label="send">Envoyer</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="text">
                        <p class="user-city" id="city">${user.city}</p>
                        <p class="user-desc" id="desc">${user.tagline}</p>
                    </div>
                </div>
                <div class="user">
                    <img alt="${user.name}" id="img-profil" src="assets/profil/Photographers ID Photos/${user.portrait}">
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