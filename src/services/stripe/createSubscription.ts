import {Users} from "../../models/users";
import {BilingsData} from '../../models/biling_data'
import Logger from "../../utils/logger";
import {Telegraf} from "telegraf";
import env from "../../constants/env";
import Stripe from "stripe";
const stripe = new Stripe(env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});

export async function createSubscription(userId: number) {
    try {
        const sender  = new Telegraf(env.TG_TOKEN);
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
        if(user && user.billingData && user.billingData.billings_period_end > new Date().getTime()){
            return await sender.telegram.sendMessage(userId, 'already has active subscription')
        }
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price: env.PRODUCT_DEFAULT_PRICE,
                    quantity: 1
                },
            ],
            metadata: {
                telegramId: userId,
            },
            after_completion: {
                type: 'redirect',
                redirect: {
                    url: "https://t.me/log_journal_bot"
                }
            },
            subscription_data: {
                trial_period_days: 7
            }
        });
        await new Telegraf(env.TG_TOKEN).telegram.sendMessage(userId, `Your link: ${paymentLink.url}`);
    } catch (e) {
        Logger.logException(e, '[cancelSubscription]')
    }
}