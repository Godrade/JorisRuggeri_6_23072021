export class Form {
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