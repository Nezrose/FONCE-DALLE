'use strict';

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51MFEBFAimxFdAEyIofKIqXTPF9GpBlVHvWbLYlEG17bZ0UpXbDSbf3t4FBDpBiggrNtoI490iLIlOPCpohTfvvQQ002aUqg6gb');
/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
      const { products } = ctx.request.body;
      try {
        const session = await stripe.checkout.sessions.create({
          shipping_address_collection: {allowed_countries: ['US', 'CA']},
          payment_method_types: ["card"],
          mode: "payment",
          success_url: "http://localhost:3000/sucess?success=true",
          cancel_url: "http://localhost:3000/cancel?success=false",
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {name: 'T-shirt'},
                unit_amount: 2000,
                tax_behavior: 'exclusive',
              },
              adjustable_quantity: {enabled: true, minimum: 1, maximum: 10},
              quantity: 1,
            },
          ],

        });
  
        await strapi
          .service("api::order.order")
          .create({ data: { stripeId: "session.id", products } });
  
        return { stripeSession: session };
      } catch (error) {
        ctx.response.status = 500;
        return { error };
      }
    },
  }));