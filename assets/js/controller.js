let url = window.location.pathname;

import { Data } from "./class/data";
import { HomePage } from "./class/homePage";
import { FilterTags } from "./class/FilterTags";
import { Photographer } from "./class/photographer";
import { Form } from "./class/form";
import { Dropdown } from "./class/Dropdown";

(async function init () {
    const data = await new Data().getJson();

    if(url === "/" || url === "/Formation/DFE/FishEye/"){
        new HomePage().create(data);
        new FilterTags().callEvents(data);
    } else {
        const user = new Photographer().getUser(data);

        new Dropdown(user, data);
        new Photographer().create(data);

        new Form().callEvents();
    }
})()