import {Request, Response} from 'express';
import {transformAndValidate} from "class-transformer-validator";
import {IsNotEmpty, IsNumberString, IsString, ValidateNested,} from "class-validator";
import '../../../models/index'
import {Type} from "class-transformer";
import {stripe} from "../../../index";
import {BilingsData} from "../../../models/biling_data";
import {Users} from "../../../models/users";
import Logger from "../../../utils/logger";
import {Telegraf} from "telegraf";
import env from "../../../constants/env";
import {ReqBody} from "./types";

interface IReqBody {
    type: string;
    data: {
        object: {
            customer: string;
            payment_link: string;
            subscription: string;
            telegramId: string;
            metadata: {
                telegramId: string
            };
        }
    }
}

class ReqBodyMetadata {
    @IsNumberString()
    telegramId!: string;
}

export default class StripeWebhookController {
    static async handle(req: Request<IReqBody, {}, {}, {}>, res: Response, next: (arg0: any) => void) {
        try {
            const reqBody = await transformAndValidate(ReqBody, req.body)
            const {metadata, customer, payment_link, subscription} = reqBody.data.object
            console.log(reqBody.data.object.subscription)
            console.log(payment_link, metadata, subscription, customer)
            const user = await Users.findOne({
                where: {
                    messenger_id: parseInt(metadata.telegramId)
                }
            })

            const date = new Date();
            date.setDate(date.getDate() + 7);
            const trial_end = +date.getTime();
            console.log(trial_end)

            await BilingsData.create({
                userId: user?.id,
                subscriptionId: subscription,
                customerId: customer,
                billings_period_end: trial_end,
            }, {})

            await stripe.paymentLinks.update(payment_link, {active: false});
            await new Telegraf(env.TG_TOKEN).telegram.sendMessage(metadata.telegramId, 'Congratulation with getting subscription, now you can use all functionality');
            res.status(200).end()
        } catch (e) {
            Logger.logException(e, '[Web-hook, checkout.session.complete]', {body: req.body})
            res.status(500).end();
        }
    }
}