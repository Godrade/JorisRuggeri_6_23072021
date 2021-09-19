let profil = new ProfilClass();
let url = window.location.pathname;

switch(url){
    case '/':
        profil.createIndexDynamicDom(profil.getJson());
        const tagList = document.querySelectorAll("button");
        tagList.forEach((element) => element.addEventListener("click",() => console.log(element.id)));
    break;
    case '/profil/':
        profil.createProfilDynamicDom(profil.getJson());
        break;
        default:
            console.log("Error page not found");
}

console.log(url);