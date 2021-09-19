class ProfilClass  {

    constructor() {
    }

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
            let test = document.querySelectorAll('.user-item');
            test.forEach(element => {document.getElementById(element.id).remove()})
        }

        data['photographers'].forEach(element => {
            let i = element.id;

            let divElt = document.createElement('div');
            divElt.className = 'user-item';
            divElt.id = `user-item-${element.id}` 
    
            let aElt = document.createElement('a');
            aElt.href = `profil/?id=${element.id}`;
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

    updateIndexDomForTag = async (tag) => {
        let data = await this.getJson(tag);
        this.createIndexDynamicDom({'photographers' : data}, true);
    }

    createProfilDynamicDom = async (data) => {
        console.log(await data['id'][243]);
    }
}