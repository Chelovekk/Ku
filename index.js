const express = require('express');
const axios = require('axios');
const { Telegraf } = require('telegraf');
const dsBot = require('./discord_bot/discord')

dsBot.client.login(process.env.DISCORD_BOT_TOKEN)


const app = express();
const bot  = new Telegraf(process.env.TG_TOKEN)

bot.use(Telegraf.log())


bot.start((ctx) => {
  ctx.reply('Welcome')
})


bot.on("text", async ctx => {
  let data = await getData()
  ctx.reply(data)
})


 async function getData(){
      try {
        let options={
                method:"GET",
                url:`https://api.openweathermap.org/data/2.5/onecall?lat=33.34&lon=-94.04&exclude=hourly,daily&appid=${process.env.API_KEY}`
              }

        let data = await axios.request(options)
        dataStringify  = await JSON.stringify(data.data);
        console.log(dataStringify)

        return dataStringify
      } catch (error) {
        console.log(error)
      }
 }


 (async () =>{
  bot.telegram.sendMessage(process.env.TG_CHANNEL_ID, await getData())
 })()

 bot.launch()

app.listen(3000, ()=>console.log())