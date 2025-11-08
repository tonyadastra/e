import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { PRODUCTS } from "@/lib/products"

export async function POST(request: NextRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! || "sk_test_51SQYPnDdygdmoX0hrRHc1oZ9SmnqkxW8m8CdKsVn6UdtMZyp7kOw1H2pxDuOVGW2iKbsrqKja6ze041VVMBHhR2G00IYvZFkVK")

    try {
        const { items } = await request.json()

        if (!items || !Array.isArray(items)) {
            return NextResponse.json(
                { error: "Items array is required" },
                { status: 400 }
            )
        }

        // Validate all products exist and build line items
        const lineItems = items.map((item: { productId: string; quantity: number }) => {
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

        return NextResponse.json({
            clientSecret: session.client_secret,
        })
    } catch (error) {
        console.error("Error creating checkout session:", error)
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to create checkout session"
            },
            { status: 500 }
        )
    }
}
