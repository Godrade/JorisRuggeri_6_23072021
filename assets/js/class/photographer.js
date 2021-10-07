import { Modal } from "./modal";
export class Photographer {
    create = (data) => {
        const userID = window.location.href.split('?id=')[1];

        //Get User by ID
        const user = data.photographers.find(photographer => photographer.id === Number(userID));
        const templatePage = `
            <div class="content-user">
                <div class="profil-info">
                    <h1 class="user-name" id="name">${user.name}</h1>
                    <p class="user-city" id="city">${user.city}</p>
                    <p class="user-desc" id="desc">${user.tagline}</p>
                    <div class="user-tag" id="user-tag">
                    ${user.tags.map((tag) => `<div class="tag"><button>#${tag}</button></div>`).join("")}
                    </div>
                    <button class="btn btn-contact" id="modal-btn">Contactez-moi</button>
                </div>
                <div class="user">
                    <img alt="Image de profil" id="img-profil" src="assets/profil/Photographers ID Photos/${user.portrait}">
                </div>
            </div>
        `;

        document.getElementById('profil').innerHTML = templatePage;

        new Modal().init();
        //Call Galery
    }
}