const express = require('express');
const app = express();
const axios = require('axios')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



// app.use('/api', adressRouter);
// app.use('/api', userRouter);

 (async ()=> {
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
      } catch (error) {
        console.log(error)
      }
 })()


app.listen(3000, ()=> console.log(`started`));