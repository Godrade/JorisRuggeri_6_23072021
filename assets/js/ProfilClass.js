class ProfilClass {

    //Recovery json data
    getJson = async (tag = null) => {
        const response = await fetch('assets/data/data.json')
        let data = await response.json();

        //Search tag list
        const arr = [];
        if (tag) {
            data['photographers'].forEach(element => {
                if (element.tags.includes(tag.toLowerCase())) {
                    arr.push(element);
                }
            })
            return arr;
        } else return data;
    }

    //Create Dom Element
    createIndexDynamicDom = async (data, tag = false) => {
        data = await data;

        if (tag) {
            let userDomItem = document.querySelectorAll('.user-item');
            userDomItem.forEach(element => {
                console.log(element);
                document.getElementById(element.id).remove()
            })
        }

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
                <div class="user-tag" id="user-tag-${photographer.id}">
                    <div id="tag-${photographer.id}" class="tag">
                        ${photographer.tags.map((tag) => `<button>#${tag}</button>`)}
                    </div>
                </div>
            </a>
            `;

            divSection.appendChild(divElt);
            divElt.innerHTML = templatePage;
        });
    }

    //Update indexDOM for Tag
    updateIndexDomForTag = async (tag) => {
        let data = await this.getJson(tag);
        this.createIndexDynamicDom({'photographers': data}, true);
    }

    createProfilDynamicDom = async (data, userID) => {
        const dataJson = await data;

        //Get User by ID
        let user = [];
        dataJson['photographers'].forEach(element => {
            if (element.id === parseInt(userID)) {
                user.push(element)
            }
        })

        //Update DOM Element
        document.getElementById('name').textContent = user[0]['name'];
        document.getElementById('contact-name').textContent = user[0]['name'];
        document.getElementById('city').textContent = user[0]['city'];
        document.getElementById('desc').textContent = user[0]['tagline'];
        document.getElementById('img-profil').src = `assets/profil/Photographers ID Photos/${user[0]['portrait']}`
        document.getElementById('user-price').textContent = user[0]['price']

        let i = 0;
        user[0]['tags'].forEach(element => {
            let divTag = document.createElement('div');
            divTag.id = `tag-${i}`;
            divTag.className = 'tag';
            document.getElementById(`user-tag`).appendChild(divTag);

            let buttonTag = document.createElement('button');
            buttonTag.textContent = `#${element}`;
            document.getElementById(`tag-${i}`).appendChild(buttonTag);
            i++;
        })

        this.createPortfolioElement(null, userID)
    }

    //Create Element for portfolio and add value in element
    createPortfolioElement = async (sort = null, userID = null) => {
        let data = await this.getJson();
        let media = this.getMedia(data, parseInt(userID));
        let user = this.getUser(data, parseInt(userID));
        let totalLike = 0;
        let imgOrVideo = null;
        let spanLike = document.getElementById('totalLike');

        if (sort === 'orderByLike') {
            this.removedPortfolioItem();
            media.sort(function (a, b) {
                return b.likes - a.likes;
            });
        }

        if (sort === 'orderByName') {
            this.removedPortfolioItem();
            media.sort(function (x, y) {
                let a = x.title.toUpperCase(),
                    b = y.title.toUpperCase();
                return a == b ? 0 : a > b ? 1 : -1;
            });
        }

        if (sort === 'orderByDate') {
            this.removedPortfolioItem();
            console.log(media.sort(function (x, y) {
                let a = new Date(x.date),
                    b = new Date(y.date);
                return a - b;
            }));
        }


        //Created DOM for media Elements
        let name = user[0]['name'].split(' ')[0].replace('-', ' ');

        media.map((medias) => {
            const divSection = document.getElementById('portfolio');
            const divElt = document.createElement('div');
            divElt.className = 'portfolio-item';
            divElt.id = `${medias.id}`

            totalLike = totalLike + medias.likes;

            if (medias.image){imgOrVideo = `<img src="assets/profil/${name}/${medias.image}" alt="Photo de Mimi Keel"></img>`}
            if (medias.video){imgOrVideo = `<video><source src="assets/profil/${name}/${medias.video}" type="video/mp4"></source></video>`}

            const templatePage = `
            <div class="portfolio-item" id="item-${medias.id}">
	            ${imgOrVideo}
	            <div class="profil-item-info" id="info-${medias.id}">
		            <p class="portfolio-name" id="name-${medias.id}">${medias.title}</p>
		            <p class="portfolio-name" id="like-${medias.id}">${medias.likes} <i class="fas fa-heart"></i></p>
	            </div>
            </div>`;
        
            divSection.appendChild(divElt);
            divElt.innerHTML = templatePage;
            spanLike.textContent = totalLike;
        })
    }

    //Remove Dom element
    removedPortfolioItem() {
        let portfolioDomItem = document.querySelectorAll('.portfolio-item');
        portfolioDomItem.forEach(element => {
            document.getElementById(element.id).remove()
        })
    }


    //get Media by UserID
    getMedia(data, userID) {
        let media = [];
        data['media'].forEach(element => {
            if (element.photographerId === userID) {
                media.push(element)
            }
        })
        return media;
    }

    //Get User by UserID
    getUser(data, userID) {
        let user = [];
        data['photographers'].forEach(element => {
            if (element.id === userID) {
                user.push(element)
            }
        })
        return user;
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

    //Read value form element
    verifiedElements() {
        console.clear();
        const form = document.querySelector('form');

        //Get value input
        const firstName = form.elements.form_firstName.value.trim();
        const lastName = form.elements.form_lastName.value.trim();
        const email = form.elements.form_email.value;
        const message = form.elements.form_message.value;

        console.log('----------');
        console.log('Prénom:', firstName);
        console.log('Nom:', lastName);
        console.log('Email:', email);
        console.log('Message:', message);
        console.log('----------');
    }

}