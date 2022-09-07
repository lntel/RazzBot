import { launch } from 'puppeteer'
import { bot } from '../app';
import { TextChannel, APIEmbed } from 'discord.js'
import botConfig from '../bot.config';

export interface NewsSource {
    url: string;
    regex: RegExp;
}

export interface NewsArticle {
    title: string;
    description: string;
    image?: string;
}

const newsScraper = async () => {

    
    const sources: NewsSource[] = [
        {
            url: 'https://loudwire.com/category/news/',
            regex: /<article>.+<div class="content">(.+)<\/div><\/article>/gm
        }
    ];

    const browser = await launch();
    const page = await browser.newPage();

    await page.goto(sources[0].url);

    const news = await page.$$eval('article', articles => {
        return articles.map(article => {

            const title = article.querySelector('.title')?.innerHTML;
            const description = article.querySelector('.excerpt')?.innerHTML;
            const link = article.querySelector('.title')?.getAttribute('href');

            if(!title || !description || description === 'Rock news.') return;

            return {
                image: article.style,
                title,
                description,
                link: `http:${link}`
            }
        })
     })

     const randomArticle = news[0];

     const embed = {
        title: randomArticle?.title,
        description: randomArticle?.description,
        url: randomArticle?.link
     }

     const channel = await bot.channels.fetch(botConfig.newsChannelId);

     (channel as TextChannel).send({
        embeds: [embed]
     })

    await browser.close();

}

export default newsScraper;