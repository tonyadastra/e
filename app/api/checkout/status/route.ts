import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET(request: NextRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    try {
        const { searchParams } = new URL(request.url)
        const sessionId = searchParams.get("session_id")

        if (!sessionId) {
            return NextResponse.json(
                { error: "Session ID is required" },
                { status: 400 }
            )
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        return NextResponse.json({
            status: session.status,
            customerEmail: session.customer_details?.email,
        })
    } catch (error) {
        console.error("Error retrieving session:", error)
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to retrieve session"
            },
            { status: 500 }
        )
    }
}
