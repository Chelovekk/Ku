import express from 'express'
import StripeWebhookController from "./controllers/stripe/web-hooks";

const paymentsRouter = express.Router();

paymentsRouter.post("/stripe/webhook", StripeWebhookController.handle);

export default paymentsRouter;