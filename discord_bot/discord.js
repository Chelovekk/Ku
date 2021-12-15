require('dotenv').config()
const { Client, Intents } = require('discord.js');
const  axios = require('axios');

class DsBot{
        constructor(){
        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
        this.client.once('ready',() => {
            console.log("started")
        }); 
        this.client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;
        
            const { commandName } = interaction;
        
            if (commandName === 'ping') {
                let f = await this.getData();
                await interaction.reply({content:f.substr(0,2000)});
            } else if (commandName === 'server') {
                await interaction.reply('Server info.');
            } else if (commandName === 'user') {
                await interaction.reply('User info.');
            }
        });
       
          
    }
     async getData(){
        try {
          let options={
                  method:"GET",
                  url:`https://api.openweathermap.org/data/2.5/onecall?lat=33.34&lon=-94.04&exclude=hourly,daily&appid=${process.env.API_KEY}`
                }
  
          let data = await axios.request(options)
          dataStringify  = await JSON.stringify(data.data);
  
          return dataStringify
        } catch (error) {
          console.log(error)
        }
   }
    
}
// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
// client.once('ready', () => {
// 	console.log('Ready!');
// }); 

// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;

// 	const { commandName } = interaction;

// 	if (commandName === 'ping') {
// 		await interaction.reply('Pong!');
// 	} else if (commandName === 'server') {
// 		await interaction.reply('Server info.');
// 	} else if (commandName === 'user') {
// 		await interaction.reply('User info.');
// 	}
// });
module.exports = new DsBot()

