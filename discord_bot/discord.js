require('dotenv').config()
const Discord = require('discord.js');

const  axios = require('axios');

class DsBot{
        constructor(){
            
        this.client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES]});
        
        this.client.once('ready', async (message) => {
            let channel = await this.client.channels.cache.get('920657637257932842').send('frfr')
        }); 
        this.client.on('interactionCreate', async interaction => {
            console.log('ferf')
            if (!interaction.isCommand()) return;
        
            const { commandName } = interaction;
        
            if (commandName === 'data') {
                let f = await this.getData();
                await interaction.reply(f.substr(0,2000));
            } else if (commandName === 'server') {
                await interaction.reply('Server info.');
            } else if (commandName === 'user') {
                await interaction.reply('User info.');
            }
        });     
        this.client.on("messageCreate", async message=>{
            if (message.content === 'ping') {
                await message.channel.send('pong');
                const channel = await this.client.guilds.cache.get('920657636809138197');
                await channel.setName('BlaBla')
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

module.exports = new DsBot()