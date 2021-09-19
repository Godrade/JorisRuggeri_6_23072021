class ProfilClass  {

    constructor() {
    }

    //Recovery json data
    getJson = async () => { 
        const response = await fetch('assets/data/data.json')
        return await response.json();
    }

    //Create Dom Element
    createIndexDynamicDom = async (data) => {
        data = await data;
        await data['photographers'].forEach(element => {
            let i = element.id;

            let divElt = document.createElement('div');
            divElt.className = 'user-item';
            divElt.id = `user-item-${i}` 
    
            let aElt = document.createElement('a');
            aElt.href = `profil/?id=${element.id}`;
            aElt.id = `link-profil-${i}`;
    
            let divAfterLink = document.createElement('div');
            divAfterLink.className = 'user';
            divAfterLink.id = `user-${i}`;
    
            const link = element.name.split(' ');
            let imgElt = document.createElement('img');
            imgElt.src = `assets/profil/Photographers ID Photos/${element.portrait}`;
    
            let pElt = document.createElement('p');
            pElt.textContent = element.name;
    
            let divAfterUser = document.createElement('div');
            divAfterUser.className = "info-user";
            divAfterUser.id = `info-user-${i}`;
    
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
            divBTag.id = `user-tag-${i}`;
    
            let divTag = document.createElement('div');
            divTag.id = `tag-${i}`;
            divTag.className = 'tag';
        
    
            document.getElementById("profil-user").appendChild(divElt);
            document.getElementById(`user-item-${i}`).appendChild(aElt);
            document.getElementById(`link-profil-${i}`).appendChild(divAfterLink);
            document.getElementById(`user-${i}`).appendChild(imgElt);
            document.getElementById(`user-${i}`).appendChild(pElt);
            document.getElementById(`link-profil-${i}`).appendChild(divAfterUser);
            document.getElementById(`info-user-${i}`).appendChild(pCity);
            document.getElementById(`info-user-${i}`).appendChild(pDesc);
            document.getElementById(`info-user-${i}`).appendChild(pPrice);
            document.getElementById(`link-profil-${i}`).appendChild(divBTag);
            document.getElementById(`user-tag-${i}`).appendChild(divTag);
    
            element.tags.forEach(tag => {
                let buttonTag = document.createElement('button');
                buttonTag.textContent = tag;
                document.getElementById(`tag-${i}`).appendChild(buttonTag);
            })

        });
    }

    createProfilDynamicDom = async (data) => {
        console.log(await data['id'][243]);
    }
}