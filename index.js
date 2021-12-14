const express = require('express');
const axios = require('axios');
const { Telegraf } = require('telegraf');


const app = express();
const bot  = new Telegraf("5029976610:AAGryrgdI3KqXn7-zfWlEO1-B5PioOoG2ek")

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
                url:"https://api.openweathermap.org/data/2.5/onecall?lat=33.34&lon=-94.04&exclude=hourly,daily&appid=85e0893962b1e32fed95b32e786f7abe"
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
  bot.telegram.sendMessage(-1001600875495, await getData())
 })()

 bot.launch()



app.listen(3000, ()=>console.log())