import { Client } from 'quickcord'
import { schedule } from 'node-cron'
import newsScraper from './jobs/newsScraper';
import botConfig from './bot.config';

export const bot = new Client('ODIxNDY1NTg5Mjg1MjU3Mjc2.YFEHcg.wMlLBeeeabh4NpFAB4cPbiIDzFA', '!', {
    intents: ['Guilds', 'GuildMessages', 'GuildPresences']
});

bot.command('test', (res, args) => {
    newsScraper();
});

bot.on('ready', client => {

    const { user } = client;

    newsScraper();

    // Start all jobs
    schedule('0 */6 * * *', newsScraper);

    console.log(`${user.username}#${user.discriminator} ready to rock and roll`);
});