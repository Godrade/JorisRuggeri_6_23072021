export class HomePage {

    //Create Dom Element
    create = (data) => {
        data.photographers.map((photographer) => {
            const divSection = document.getElementById('profil-user');
            const divElt = document.createElement('div');
            divElt.className = 'user-item';
            divElt.id = `${photographer.id}`

            const templatePage = `
            <a href="profil.html?id=${photographer.id}" id="link-profil-${photographer.id}">
                <div class="user" id="user-${photographer.id}">
                    <img src="assets/profil/Photographers ID Photos/${photographer.portrait}">
                    <p>${photographer.name}</p></div>
                <div class="info-user" id="info-user-${photographer.id}"><p class="city">${photographer.city}</p>
                    <p class="description">${photographer.tagline}</p>
                    <p class="price">${photographer.price}€/j</p></div>
            </a>
            `;

            // <div class="user-tag" id="user-tag-${photographer.id}">
            //     <div id="tag-${photographer.id}" class="tag">
            //         ${photographer.tags.map((tag) => `<span>#${tag}</span>`).join("")}
            //     </div>
            // </div>

            divSection.appendChild(divElt);
            divElt.innerHTML = templatePage;
        });

        this.getScrolling();
    }

    //GetScrolling for display or not btn content
    getScrolling() {
        let btnContent = document.getElementById('btnContent')
        window.onscroll = function (e) {
            let distanceScrolled = document.documentElement.scrollTop;
            if (distanceScrolled > 50) {
                btnContent.style.display = 'block'
            }
            if (distanceScrolled < 50) {
                btnContent.style.display = 'none'
            }
        }
    }
}