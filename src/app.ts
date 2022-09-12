import { Client } from 'quickcord'
import { schedule } from 'node-cron'
import newsScraper from './jobs/newsScraper';
import botConfig from './bot.config';
import { ChannelType, TextChannel } from 'discord.js';

export const bot = new Client(botConfig.token, '!', {
    intents: ['Guilds', 'GuildMessages', 'GuildPresences']
});

bot.command('test', (res, args) => {
    newsScraper();
});

bot.on('ready', async client => {

    const { user } = client;

    const guild = client.guilds.cache.first();

    const invite = await guild?.invites.create(botConfig.newsChannelId)

    console.log(invite?.url)

    // newsScraper();

    // Start all jobs
    schedule('0 */6 * * *', newsScraper);

    console.log(`${user.username}#${user.discriminator} ready to rock and roll`);
});
