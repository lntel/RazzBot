import { launch } from 'puppeteer'
import { bot } from '../app';
import { TextChannel, APIEmbed, EmbedBuilder } from 'discord.js'
import botConfig from '../bot.config';
import loudwire from '../scrapers/loudwire';
import rocknewsuk from '../scrapers/rocknewsuk';

export interface NewsSource {
    url: string;
    logoUrl: string;
    cb: (elements: HTMLElement[]) => void;
}

export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    time?: string;
    image?: string;
}

const newsScraper = async () => {

    
    const sources: NewsSource[] = [
        {
            url: 'https://loudwire.com/category/news/',
            logoUrl: 'https://townsquare.media/site/366/files/2019/03/ldlogo2.png',
            cb: loudwire
        },
        {
            url: 'https://www.rocknews.co.uk/',
            logoUrl: 'https://www.rocknews.co.uk/wp-content/uploads/2021/12/Billboard-Ad-9-7.png',
            cb: rocknewsuk
        },
    ];

    const browser = await launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });
    const page = await browser.newPage();

    const source = sources[Math.floor(Math.random() * sources.length)];

    await page.goto(source.url, {
        waitUntil: 'networkidle0'
    });

    const articles = ((await page.$$eval('article', source.cb)) as unknown as NewsArticle[]).filter(article => article);

    const randomArticle = articles[Math.floor(Math.random() * articles.length)];

    console.log(randomArticle)

    const embed = new EmbedBuilder()
        .setTitle(randomArticle.title || null)
        .setDescription(randomArticle.description || null)
        .setThumbnail(source.logoUrl || null)
        .setImage(randomArticle.image || null)
        .setURL(randomArticle.url || null)
        .setColor('#1A1A1A')
        .setFooter({
            text: randomArticle.time ? randomArticle.time : new Date().toDateString()
        })

    const channel = await bot.channels.fetch(botConfig.newsChannelId);

    (channel as TextChannel).send({
        embeds: [embed]
    })

    await browser.close();

}

export default newsScraper;