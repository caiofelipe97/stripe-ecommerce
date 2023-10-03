import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cartProducts } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!cartProducts) {
    return res.status(400).json({ error: "cartProducts not found." });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const lineItems = cartProducts.map((cartItem) => ({
    price: cartItem.price_data.id,
    quantity: cartItem.quantity,
  }));

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: lineItems,
  });

  return res.status(201).json({ sessionId: checkoutSession.id });
}
