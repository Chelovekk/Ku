require('dotenv').config();
const Discord = require('discord.js');

const  axios = require('axios');

class DsBot{
        constructor(){
            
        this.client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES], partials: ['MESSAGE', 'CHANNEL']});
        this.client.once('ready', async () => {
            let data  = await this.getData();
            await this.client.channels.cache.get(process.env.DISCORD_TEXT_CHANNEL_ID).send(data.substr(0,2000));
        }); 

        this.client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;            
            const { commandName } = interaction;
            if (commandName === 'data') {
                let data = await this.getData();
                await interaction.reply(data.substr(0,2000));
            } 
        });   

        this.client.on("messageCreate", async message=>{
          if (message.content === 'data'){
              let data  = await this.getData();
              await message.channel.send(data.substr(0,2000));
            }
        });
    }  
    
     async getData(){
        try {
          let options={
                  method: "GET",
                  url: `https://api.openweathermap.org/data/2.5/onecall?lat=33.34&lon=-94.04&exclude=hourly,daily&appid=${process.env.API_KEY}`
                }
  
        let data = await axios.request(options);
        let dataStringify  = await JSON.stringify(data.data);
          return dataStringify;
        } catch (error) {
          console.log(error);
        }
   }
    
}

module.exports = new DsBot();