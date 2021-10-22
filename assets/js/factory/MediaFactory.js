import { ImageFactory } from "./ImageFactory";
import { VideoFactory } from "./videoFactory";

export class MediaFactory {
    render(element, name){
        let media;
        if(element.hasOwnProperty('image')){
            media = new ImageFactory();
        }

        if(element.hasOwnProperty('video')){
            media = new VideoFactory();
        }

        return media.createElt(element, name);
    }
}