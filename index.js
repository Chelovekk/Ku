const express = require('express');
const app = express();
const axios = require('axios');
const { Telegraf } = require('telegraf');


const bot  = new Telegraf("5029976610:AAGryrgdI3KqXn7-zfWlEO1-B5PioOoG2ek")
console.log(bot)
bot.use(Telegraf.log())


bot.start((ctx) => {
  ctx.reply('Welcome')
})
bot.on("text", async ctx => {
  let some = await smth()
  console.log(some)
  ctx.reply(some)
})


 async function smth(){
      try {
        let options={
          method:"GET",
          // url: "https://freecurrencyapi.net/api/v2/historical?apikey=6d106ff0-5c1c-11ec-8e77-395865b2c185&base_currency=USD&symbols=UAH"
        url:"https://api.openweathermap.org/data/2.5/onecall?lat=33.34&lon=-94.04&exclude=hourly,daily&appid=85e0893962b1e32fed95b32e786f7abe"     
        // url:"https://api.openweathermap.org/data/2.5/onecall?lat=48.44&lon=25.04&exclude=hourly,daily&appid=85e0893962b1e32fed95b32e786f7abe"     

          }
        let data = await axios.request(options)
          sec = new Date().getMinutes();
        console.log(await JSON.stringify(data.data))
        dataStringify  = await JSON.stringify(data.data);
        return dataStringify
      } catch (error) {
        console.log(error)
      }
 }
 (async () =>{
  bot.telegram.sendMessage(-1001600875495, await smth())
 })()

 bot.launch()



app.listen(3000, ()=>console.log())