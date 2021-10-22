export class Modal {

    constructor(){
        this.modalbg = document.getElementById("bground");
    }

    modal({ open }){
        if(open){
            this.launchModal();
            this.eventBtn();
        } else {
            this.closeModal();
        }
    }

    launchModal() {
        this.modalbg.style.display = "block";
    }

    closeModal() {
        document.body.classList.remove('open-modal');
        this.modalbg.style.display = "none";
    }

    eventBtn(){
        const modalClose = document.querySelectorAll('.close');
        const btnModalClose = document.getElementById('close-modal');
        modalClose.forEach((btn) =>{
            btn.addEventListener('click', () => {
                this.modal({ open: false });
            });
        });
    }
}