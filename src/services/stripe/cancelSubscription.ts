import {Users} from "../../models/users";
import {BilingsData} from '../../models/biling_data'
import Logger from "../../utils/logger";
import {Telegraf} from "telegraf";
import env from "../../constants/env";
import Stripe from "stripe";
const stripe = new Stripe(env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});

export async function cancelSubscription(userId: number) {
    try {
        const user = await Users.findOne({
            where: {
                messenger_id: userId
            },
            include: [
                {
                    model: BilingsData,
                    required: true
                }
            ]
        })
        if(!user || !user.billingData) throw 'User not exist'
        await stripe.subscriptions.del(user?.billingData.subscriptionId);
        await BilingsData.destroy({
            where:{
                id: user.billingData.id
            }
        })
        await new Telegraf(env.TG_TOKEN).telegram.sendMessage(userId, 'Canceled');
    } catch (e) {
        Logger.logException(e, '[cancelSubscription]')
    }
}