export class VideoFactory{
    createElt(src){
        return `<video><source src="${src}" type="video/mp4"></source></video>`
    }
}