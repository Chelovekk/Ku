import Logger from "./utils/logger";
import delay from "delay";
import {SendNotifications} from "./services/telegram/update_notifications";
import './models/index'
import {Users} from "./models/users";


(async () => {
    while (true) {
        try {
            const sendNotifications = new SendNotifications(Logger);
            await sendNotifications.handle()
            await delay(5000)
        } catch (e) {
            console.log(e)
            await Logger.logException(e, '[SendNotifications]: Failed')
            await delay(5000);
        }
    }
})();

(async () => {
    while (true) {
        try {
            await delay(1000)
        } catch (e) {
            await Logger.logException(e, '[SendNotifications]: Failed')
            await delay(5000);
        }
    }
})()