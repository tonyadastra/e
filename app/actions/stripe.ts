"use server"

import { stripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

export async function createCheckoutSession(items: Array<{ productId: string; quantity: number }>) {
  try {
    // Validate all products exist and build line items
    const lineItems = items.map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId)
      if (!product) {
        throw new Error(`Product with id "${item.productId}" not found`)
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: item.quantity,
      }
    })

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      redirect_on_completion: "never",
      line_items: lineItems,
      mode: "payment",
    })

    return { clientSecret: session.client_secret, error: null }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return {
      clientSecret: null,
      error: error instanceof Error ? error.message : "Failed to create checkout session",
    }
  }
}

export async function getSessionStatus(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return {
      status: session.status,
      customerEmail: session.customer_details?.email,
      error: null,
    }
  } catch (error) {
    console.error("Error retrieving session:", error)
    return {
      status: null,
      customerEmail: null,
      error: error instanceof Error ? error.message : "Failed to retrieve session",
    }
  }
}
