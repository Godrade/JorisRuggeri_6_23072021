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
        document.getElementById('form_firstName').setAttribute('autofocus', '')
    }

    closeModal() {
        document.body.classList.remove('open-modal');
        this.modalbg.style.display = "none";
    }

    eventBtn(){
        const modalClose = document.querySelectorAll('.close');
        modalClose.forEach((btn) =>{
            btn.addEventListener('click', () => {
                this.modal({ open: false });
            });
        });
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                this.modal({ open: false });
            }
        });
    }
}