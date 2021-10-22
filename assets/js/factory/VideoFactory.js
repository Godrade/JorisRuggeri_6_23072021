export class VideoFactory{
    createElt(element, name){
        return `<video><source src="assets/profil/${name}/${element.video}" type="video/mp4"></source></video>`
    }
}