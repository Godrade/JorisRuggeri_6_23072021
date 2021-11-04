export class VideoFactory{
    createElt(element, name){
        return `<video class="media" data-id="${element.id}"><source src="assets/profil/${name}/${element.video}" type="video/mp4"></source></video>`
    }
}