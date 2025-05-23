const StripeConfig = {
  stripeSecret: process.env.STRIPE_SECRET_KEY,
  stripePublishable: process.env.STRIPE_PUBLISHABLE_KEY,
};

export default StripeConfig;
