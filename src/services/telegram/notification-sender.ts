import {createRedisConnection} from "../redis-service";
import env from "../../constants/env";
import {Telegraf} from "telegraf";
import '../../models/index'

const redis = createRedisConnection();
const arr: string[] = [env.REDIS.KEY.SUBSCRIPTION_CANCEL_NOTIFICATIONS, env.REDIS.KEY.STATISTIC_UPDATE_NOTIFICATIONS]
redis.subscribe(...arr, (err, count) => {
    if (err) console.log(err)
    console.log(`Subscribing on ${count} channels`)
})
redis.on('message', (channel, telegramIds) => {
    switch (channel) {
        case `${env.REDIS.KEY.SUBSCRIPTION_CANCEL_NOTIFICATIONS}`:
            const TelegrafInstance = new Telegraf(env.TG_TOKEN);
            TelegrafInstance.launch();
            telegramIds = JSON.parse(telegramIds);
        break;
        case env.REDIS.KEY.STATISTIC_UPDATE_NOTIFICATIONS:


    }
})

