import dotenv from 'dotenv';
import express from 'express';
import bodyParser from "body-parser";
import Stripe from "stripe";
import env from "./constants/env";
import 'reflect-metadata'
import paymentsRouter from "./api/payments";
import morgan from 'morgan'
import {rotatingLogger} from "./utils/logger/rotating";
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});
dotenv.config();

const logger = rotatingLogger('logs', 'myTest').debug({
    a:1
});


const app = express();
app.use(morgan('dev'))

app.use(bodyParser.json({
    limit: '2mb'
}));

app.use('/api/payments', paymentsRouter);


logger.debug('Started', app)
logger.debug({a:'frefer'});
logger.error('dewwe')

app.listen(process.env.PORT, () => console.log(`started, ${process.env.PORT}`));