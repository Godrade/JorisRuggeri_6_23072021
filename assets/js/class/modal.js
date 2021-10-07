const modalBtn = document.getElementById("modal-btn");
const modalbg = document.getElementById("bground");

export class Modal {

    init(){
        // launch modal event
        console.log(modalBtn, modalbg);
        if(modalBtn){
            modalBtn.addEventListener("click", this.launchModal)
        }
        

        //Close modal
        const modalClose = document.querySelectorAll(".close");
        const btnModalClose = document.getElementById("close-modal");
        modalClose.forEach((btn) => btn.addEventListener("click", this.closeModal));
    }

    launchModal() {
        this.modalbg.style.display = "block";
        // document.body.classList.add('open-modal');
        // this.form.style.display = "block";
        // this.modalbg.style.display = "block";
    }

    closeModal() {
        document.body.classList.remove('open-modal');
        modalbg.style.display = "none";
    }
}