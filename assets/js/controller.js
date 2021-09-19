let profil = new ProfilClass();
let url = window.location.pathname;

switch(url){
    case '/':
        profil.createIndexDynamicDom(profil.getJson());
        const tagList = document.querySelectorAll("button");
        tagList.forEach((element) => element.addEventListener("click",() => profil.updateIndexDomForTag(element.id)));
    break;
    case '/profil.html':
        profil.createProfilDynamicDom(profil.getJson(), window.location.href.split('?id=')[1]);

        // DOM Elements
        const modalbg = document.querySelector(".bground");
        const modalBtn = document.querySelectorAll(".modal-btn");
        const form = document.getElementById("form");

        // launch modal event
        modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

        //Close modal
        const modalClose = document.querySelectorAll(".close");
        const btnModalClose = document.getElementById("close-modal");
        modalClose.forEach((btn) => btn.addEventListener("click", closeModal));


        function launchModal() {
            form.reset();
            document.body.classList.add('open-modal');
            form.style.display = "block";
            modalbg.style.display = "block";
        }
    
        function closeModal() {
            document.body.classList.remove('open-modal');
            modalbg.style.display = "none";
        }

        //Verified elements
        function validate() {
            profil.verifiedElements();
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            validate();
        });
        break;
        default:
            console.log("Error page not found");
}

console.log('Url is',url);