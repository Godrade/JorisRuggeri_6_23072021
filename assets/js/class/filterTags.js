export class FilterTags {
    callEvents(data){
        const tagList = document.querySelectorAll("button");
        tagList.forEach((filterTag) => filterTag.addEventListener("click", () => this.filter(filterTag.id, data)));
    }

    filter(filterName, data){
        data.photographers.map((photographer) => {
            const user = document.getElementById(photographer.id)
            let filter = photographer.tags.includes(filterName.toLowerCase());

            if(!filter){
                user.style.display = 'none';
            } else if(filter){
                if(user.style.display = 'none'){
                    user.style.display = 'block';
                }
            }
            
        });
    }
}