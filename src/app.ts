import { Client } from 'quickcord'
import { schedule } from 'node-cron'
import newsScraper from './jobs/newsScraper';
import botConfig from './bot.config';
import { ChannelType, TextChannel } from 'discord.js';

export const bot = new Client('MTAxNzEyMzEyODgzODcxNzQ1MA.GHuj6Y.NnB6dwOsshoNP5YiRrjzkbeLMOykrm7oVJ5AqU', '!', {
    intents: ['Guilds', 'GuildMessages', 'GuildPresences']
});

bot.command('test', (res, args) => {
    newsScraper();
});

bot.on('ready', async client => {

    const { user } = client;

    const guild = client.guilds.cache.first();

    const invite = await guild?.invites.create((guild.channels.cache.first() as TextChannel))

    console.log(invite?.url)
    // newsScraper();

    // Start all jobs
    schedule('0 */6 * * *', newsScraper);

    console.log(`${user.username}#${user.discriminator} ready to rock and roll`);
});
