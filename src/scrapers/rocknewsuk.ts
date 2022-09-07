import { NewsArticle } from "../jobs/newsScraper";

export default (elements: HTMLElement[]) => {
    return elements.map(element => {
        const result: NewsArticle = {
            title: '',
            description: '',
            url: ''
        };

        const title = element.querySelector('.entry-title a');
        const excerpt = element.querySelector('.entry-content p');
        const imageTag = element.querySelector('.featured-image img');
        const aTag = element.querySelector('.featured-image a');

        if(!title) return;

        if(imageTag) result.image = (imageTag as HTMLImageElement).dataset.src;
        if(aTag) result.url = (aTag as HTMLAnchorElement).href;
        if(title) result.title = title.innerHTML;
        if(excerpt) result.description = excerpt.innerHTML.replace(/&nbsp;/g, '');

        return result;
    })
}