let profil = new ProfilClass();
let url = window.location.pathname;

switch(url){
    case '/':
    case '/Formation/DFE/FishEye/':
        profil.createIndexDynamicDom(profil.getJson());
        const tagList = document.querySelectorAll("button");
        tagList.forEach((element) => element.addEventListener("click",() => profil.updateIndexDomForTag(element.id)));
    break;
    case '/profil.html':
    case '/Formation/DFE/FishEye/profil.html':
        profil.createProfilDynamicDom(profil.getJson(), window.location.href.split('?id=')[1]);

        const dropbtn = document.getElementById('dropbtn');
        dropbtn.addEventListener('click', () => {
            document.getElementById("dropdown").classList.toggle("show");
        })
        
        window.onclick = function(e) {
            if (!e.target.matches('.dropbtn')) {
                let dropdowns = document.getElementsByClassName("dropdown-content");
              let i;
              for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
                }
              }
            }
          }

        const orderByLike = document.getElementById('orderByLike');
        orderByLike.addEventListener('click', () => profil.createPortfolioElement(orderByLike.id, window.location.href.split('?id=')[1]));

        const orderByName = document.getElementById('orderByName');
        orderByName.addEventListener('click', () => profil.createPortfolioElement(orderByName.id, window.location.href.split('?id=')[1]));

        const orderByDate = document.getElementById('orderByDate');
        orderByDate.addEventListener('click', () => profil.createPortfolioElement(orderByDate.id, window.location.href.split('?id=')[1]));

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