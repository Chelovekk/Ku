import {createRedisConnection} from "../redis-service";
import env from "../../constants/env";
import {Telegraf} from "telegraf";
import {Users} from "../../models/users";

const redis = createRedisConnection();
const arr:string[] = [env.REDIS.KEY.TELEGRAM_CANCEL_NOTIFICATIONS,'w']
redis.subscribe(...arr, (err,count)=>{
    if(err) console.log(err)
    console.log(`Subscribing on ${count} channels`)
})
redis.on('message', (channel, telegramIds) => {
    switch (channel){
        case `${env.REDIS.KEY.TELEGRAM_CANCEL_NOTIFICATIONS}`:
            const TelegrafInstance = new Telegraf(env.TG_TOKEN);
            TelegrafInstance.launch();
            telegramIds = JSON.parse(telegramIds);
    }
})

