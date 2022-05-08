import express from 'express'
import StripeWebhookController from "./controllers/stripe/web-hooks";

const paymentsRouter = express.Router();

paymentsRouter.post("/checkout-webhook", StripeWebhookController.handleCheckout);
paymentsRouter.post("/subscription-update", StripeWebhookController.handleSubscriptionUpdated);

export default paymentsRouter;