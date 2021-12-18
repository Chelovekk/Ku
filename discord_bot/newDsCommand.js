const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

require('dotenv').config();

const commands = [
{
    name: 'getData',
    description: 'Replies with data'
}
]; 

const rest = new REST({ version: '9' }).setToken("");

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
        Routes.applicationGuildCommands(920656127321047070, 920657636809138197),
        { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
