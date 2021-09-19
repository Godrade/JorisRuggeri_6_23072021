class ProfilClass  {

    //Recovery json data
    getJson = async (tag = null) => { 
        const response = await fetch('assets/data/data.json')
        let data = await response.json();

        //Search tag list
        const arr = [];
        if (tag){
            data['photographers'].forEach(element => {
                if(element.tags.includes(tag.toLowerCase())){
                    arr.push(element);
                }
            })
            return arr;
        } else return data;
    }

    //Create Dom Element
    createIndexDynamicDom = async (data, tag = false) => {
        data = await data;

        if(tag){
            let userDomItem = document.querySelectorAll('.user-item');
            userDomItem.forEach(element => {document.getElementById(element.id).remove()})
        }

        data['photographers'].forEach(element => {
            let i = element.id;

            let divElt = document.createElement('div');
            divElt.className = 'user-item';
            divElt.id = `user-item-${element.id}` 
    
            let aElt = document.createElement('a');
            aElt.href = `profil.html?id=${element.id}`;
            aElt.id = `link-profil-${element.id}`;
    
            let divAfterLink = document.createElement('div');
            divAfterLink.className = 'user';
            divAfterLink.id = `user-${element.id}`;
    
            const link = element.name.split(' ');
            let imgElt = document.createElement('img');
            imgElt.src = `assets/profil/Photographers ID Photos/${element.portrait}`;
    
            let pElt = document.createElement('p');
            pElt.textContent = element.name;
    
            let divAfterUser = document.createElement('div');
            divAfterUser.className = "info-user";
            divAfterUser.id = `info-user-${element.id}`;
    
            let pCity = document.createElement('p');
            pCity.className = 'city'
            pCity.textContent = element.city;
    
            let pDesc = document.createElement('p');
            pDesc.className = 'description';
            pDesc.textContent = element.tagline;
    
            let pPrice = document.createElement('p');
            pPrice.className = 'price'
            pPrice.textContent = `${element.price}€/j`;
    
            let divBTag = document.createElement('div');
            divBTag.className = 'user-tag';
            divBTag.id = `user-tag-${element.id}`;
    
            let divTag = document.createElement('div');
            divTag.id = `tag-${element.id}`;
            divTag.className = 'tag';
        
    
            document.getElementById("profil-user").appendChild(divElt);
            document.getElementById(`user-item-${element.id}`).appendChild(aElt);
            document.getElementById(`link-profil-${element.id}`).appendChild(divAfterLink);
            document.getElementById(`user-${element.id}`).appendChild(imgElt);
            document.getElementById(`user-${element.id}`).appendChild(pElt);
            document.getElementById(`link-profil-${element.id}`).appendChild(divAfterUser);
            document.getElementById(`info-user-${element.id}`).appendChild(pCity);
            document.getElementById(`info-user-${element.id}`).appendChild(pDesc);
            document.getElementById(`info-user-${element.id}`).appendChild(pPrice);
            document.getElementById(`link-profil-${element.id}`).appendChild(divBTag);
            document.getElementById(`user-tag-${element.id}`).appendChild(divTag);
    
            element.tags.forEach(tag => {
                let buttonTag = document.createElement('button');
                buttonTag.textContent = tag;
                document.getElementById(`tag-${element.id}`).appendChild(buttonTag);
            })

        });
    }

    //Update indexDOM for Tag
    updateIndexDomForTag = async (tag) => {
        let data = await this.getJson(tag);
        this.createIndexDynamicDom({'photographers' : data}, true);
    }

    createProfilDynamicDom = async (data, userID) => {
        const dataJson = await data;

        //Get User by ID
        let user = [];
        dataJson['photographers'].forEach(element => {
            if (element.id == userID){
                user.push(element)
            }
        })

        //Update DOM Element
        document.getElementById('name').textContent = user[0]['name'];
        document.getElementById('contact-name').textContent = user[0]['name'];
        document.getElementById('city').textContent = user[0]['city'];
        document.getElementById('desc').textContent = user[0]['tagline'];
        document.getElementById('img-profil').src = `assets/profil/Photographers ID Photos/${user[0]['portrait']}`

        let i = 0;
        user[0]['tags'].forEach(element => {
            
            let divTag = document.createElement('div');
            divTag.id = `tag-${i}`;
            divTag.className = 'tag';
            document.getElementById(`user-tag`).appendChild(divTag);

            let buttonTag = document.createElement('button');
            buttonTag.textContent = element;
            document.getElementById(`tag-${i}`).appendChild(buttonTag);
            i++;
        })


        //get Media by UserID
        let media = [];
        dataJson['media'].forEach(element => {
            if (element.photographerId == userID){
                media.push(element)
            }
        })


        //Created DOM for media Elements
        let name = user[0]['name'].split(' ')[0].replace('-', ' ');
        media.forEach(element => {
            let divItem = document.createElement('div');
            divItem.className = 'portfolio-item';
            divItem.id = `item-${element.id}`;

                let videoElt = document.createElement('video');
                videoElt.setAttribute('controls', 'true');
                videoElt.id = `video-${element.id}`

                let sourceElt = document.createElement('source');
                sourceElt.src = `assets/profil/${name}/${element.video}`;
                sourceElt.type = 'video/mp4';

                let imageElt = document.createElement('img');
                imageElt.src = `assets/profil/${name}/${element.image}`;
                imageElt.alt = `Photo de ${user[0]['name']}`;

            let divItemInfo = document.createElement('div');
            divItemInfo.className = 'profil-item-info';
            divItemInfo.id = `info-${element.id}`

            let pItemName = document.createElement('p');
            pItemName.className = "portfolio-name";
            pItemName.id = `name-${element.id}`
            pItemName.textContent = element.title;

            let pItemlike = document.createElement('p');
            pItemlike.className = "portfolio-name";
            pItemlike.id = `like-${element.id}`
            pItemlike.textContent = `${element.likes} <3`;

            document.getElementById("portfolio").appendChild(divItem);
            
            if (element.video){
                document.getElementById(`item-${element.id}`).appendChild(videoElt);
                document.getElementById(`video-${element.id}`).appendChild(sourceElt);
            } else {
                document.getElementById(`item-${element.id}`).appendChild(imageElt);
            }

            document.getElementById(`item-${element.id}`).appendChild(divItemInfo);
            document.getElementById(`info-${element.id}`).appendChild(pItemName);
            document.getElementById(`info-${element.id}`).appendChild(pItemlike);

        })
    }

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