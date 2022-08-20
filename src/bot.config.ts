import dotenv from 'dotenv'

dotenv.config();

export interface BotConfiguration {
    token: string;
    newsChannelId: string;
    guildId: string;
}

const botConfig: BotConfiguration = {
    token: process.env.BOT_TOKEN || "",
    newsChannelId: process.env.NEWS_CHANNEL_ID || "770952517382963221",
    guildId: process.env.GUILD_ID || "746120267905892431"
}

export default botConfig;