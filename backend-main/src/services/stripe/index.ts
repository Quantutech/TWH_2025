import Stripe from 'stripe';
import Service from '../../decorators/service';
import StripeConfig from '../../configs/stripe-config';
import { BadRequestError } from '../../errors/custom-errors';
import WebServerConfigs from '../../configs/web-server-config';

@Service()
export default class StripeService {
  public stripe: Stripe;

  constructor() {
    if (!StripeConfig.stripeSecret) {
      throw new Error('Stripe secret key is not defined');
    }
    this.stripe = new Stripe(StripeConfig.stripeSecret, {
      apiVersion: '2025-02-24.acacia',
    });
  }

  public async findCustomer(email: string) {
    try {
      const customers = await this.stripe.customers.list({
        limit: 1,
        email,
      });
      return customers?.data?.[0];
    } catch (error) {
      console.error("Error listing customers:", error);
    }
  }

  public async customerMoreDetail(email: string) {
    try {
      const customerDetail = await this.findCustomer(email)

      if (!customerDetail) return undefined
      const customer = await this.stripe.customers.retrieve(customerDetail?.id, {
        expand: ["subscriptions"],
      });

      return customer;
    } catch (error) {
      return undefined
    }
  }

  public async getSubscriptionStatus(email: string): Promise<{
    status: "active" | "trial";
    expiresAt: Date;
  } | false> {
    try {
      const customer: any = await this.customerMoreDetail(email);

      if (!customer) return false;

      const subscriptions = customer.subscriptions?.data || [];

      const activeSub = subscriptions.find((sub: any) =>
        sub.status === "active" || sub.status === "trialing"
      );

      if (!activeSub) return false;

      const status = activeSub.status === "trialing" ? "trial" : "active";
      const expiresAtUnix = activeSub.current_period_end;
      const expiresAt = new Date(expiresAtUnix * 1000);

      return {
        status,
        expiresAt,
      };
    } catch (error) {
      console.error("Error getting subscription status:", error);
      return false;
    }
  }

  public async createCustomer(email: string): Promise<string> {
    try {
      const customer = await this.stripe.customers.create({
        email,
      });
      return customer.id;
    } catch (error: any) {
      throw new BadRequestError(
        `Failed to create Stripe customer: ${error.message}`
      );
    }
  }

  public async createSubscription(
    customerId: string,
    priceId: string
  ): Promise<string> {
    try {
      const url = `${WebServerConfigs.frontURl}/success-subcription`;
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        subscription_data: {
          trial_period_days: 14,
        },
        success_url: url
      });

      return session.url!
    } catch (error: any) {
      throw new BadRequestError(
        `Failed to create subscription: ${error.message}`
      );
    }
  }

  public async cancelSubscription(customerId: string): Promise<string> {
    try {
      const url = `${WebServerConfigs.frontURl}`;
      const portalSession = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: url
      });

      return portalSession.url
    } catch (error: any) {
      throw new BadRequestError(
        `Failed to cancel subscription: ${error.message}`
      );
    }
  }
}
