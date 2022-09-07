import { NewsArticle } from "../jobs/newsScraper";

export default (elements: HTMLElement[]) => {
    return elements.map(element => {
        const result: NewsArticle = {
            title: '',
            description: '',
            url: ''
        };

        const title = element.querySelector('.title');
        const excerpt = element.querySelector('.excerpt');
        const aTag = element.querySelector('a');
        const timeTag = element.querySelector('time');

        if(!title) return;

        if(aTag) {

            const href = aTag.href;

            if(href) result.url = href;

            let backgroundImage = aTag.style.backgroundImage;

            if(!backgroundImage || !backgroundImage.length) return;

            backgroundImage = backgroundImage.slice(4, -1).replace(/["']/g, "");

            result.image = `http:${backgroundImage}`;
        }

        if(timeTag) result.time = timeTag.innerHTML;
        if(title) result.title = title.innerHTML;
        if(excerpt) result.description = excerpt.innerHTML;

        return result;
    })
}