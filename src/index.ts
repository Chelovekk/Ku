import dotenv from 'dotenv';
import express from 'express';
import bodyParser from "body-parser";
import {BilingsData} from "./models/biling_data";
import {Users} from "./models/users";
import Stripe from "stripe";
import env from "./constants/env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});

const db = require("./models/index")
dotenv.config();
const app = express();
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));

const router = express.Router()
router.post('/stripe_webhooks', async (req, res) => {
    console.log(req.body.type, req.body.data.object)
    const [customer, payment_link, metadata, subscription] = req.body.data.object;
    switch (req.body.type) {
        case 'checkout.session.completed':
            const user = await Users.findOne({
                where: {
                    messenger_id: parseInt(metadata.telegramId)
                }
            })
            await BilingsData.upsert({
                id: user.id,
                subscriptionId: subscription,
                customerId: customer
            }, {})
            await stripe.paymentLinks.update(payment_link, {active: false});
            break;
    }


    // console.log(req)
    res.status(200).send({succes: true});
})

app.get('/', function (req, res) {
    res.send('hello world');
});
app.delete('/stripe_webhooks', async (req, res) => {
    console.log(req.body)
    res.status(200).send({succes: true});
})

app.use(router)


app.listen(process.env.PORT, () => console.log(`started, ${process.env.PORT}`));