const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()
const commands = [
	new SlashCommandBuilder().setName('data').setDescription('Replies with data!'),

]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_CHANNEL_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
