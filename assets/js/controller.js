let url = window.location.pathname;

import { Data } from "./class/Data";
import { HomePage } from "./class/HomePage";
import { FilterTags } from "./class/FilterTags";
import { Photographer } from "./class/Photographer";
import { Form } from "./class/Form";
import { Dropdown } from "./class/Dropdown";

(async function init () {
    const data = await new Data().getJson();

    if(url.includes('index.html')){
        new HomePage().create(data);
        new FilterTags().callEvents(data);
    } else {
        const user = new Photographer().getUser(data);
        new Photographer().create(data);
        
        new Dropdown(user, data);
        new Form().callEvents();
    }
})()