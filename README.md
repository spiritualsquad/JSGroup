# JSGroup
Simple demo on how to implement stripe
Stripe Checkout Integration Guide

This guide will help you integrate Stripe Checkout into your Express.js application for processing payments. By following these steps, you'll be able to create a basic Stripe checkout flow.
Prerequisites

    Node.js installed

    A Stripe account (sign up at Stripe)

    A basic Express.js application

Steps for Integration
1. Install Required Dependencies

First, make sure you have the necessary dependencies installed.

In your project folder, run the following command to install Express and Stripe:

npm install express stripe

2. Set Up Stripe API Key

In your server.js or app.js, you'll need to configure Stripe by adding your test API key.

const stripe = require('stripe')('sk_test_51R84WoGfdMY1QgMrFP2bZsdrP6P2tZXaEsqtex7Qo5Qi73KBGbzxJDQQpkyBGDMTKWMRzD5jMfdep4FSQsMEaHAW00xyTdTdpZ');

Note: Replace this API key with your actual Stripe test key from the Stripe dashboard.
3. Create Checkout Route in Your Router

In your routes/index.js or any router file, create a POST route for /checkout to handle creating a Stripe session.

router.post('/checkout', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: 'Demo Product' },
                    unit_amount: 5000, // $50
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000',
            cancel_url: 'http://localhost:3000',
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

This route will create a Stripe Checkout session and return the session URL.
4. Set Up HTML and JavaScript for Checkout Button

In your views/index.ejs (or any other frontend file), set up a button for initiating the checkout process and a script to redirect the user to Stripe's hosted checkout page.

<h2>Stripe Checkout</h2>
<button id="checkout">Pay $50</button>

<script>
document.getElementById('checkout').addEventListener('click', async () => {
    const res = await fetch('/checkout', { method: 'POST' });
    const { url } = await res.json();
    window.location.href = url;
});
</script>

5. Start the Server

Make sure to start your Express server:

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

6. Run the Application

    Start your server with the following command:

node server.js

    Open your browser and navigate to http://localhost:3000. You should see the "Pay $50" button.

    When you click the "Pay $50" button, you will be redirected to the Stripe Checkout page where you can complete the payment.

7. Test Payments

Since you're using a Stripe test API key, you can test payments using Stripe's test credit card numbers. For example:

    Card Number: 4242 4242 4242 4242

    Expiry Date: Any future date

    CVC: Any 3 digits

Stripe provides a full list of test card numbers for different scenarios.
8. Handle Success and Cancel URLs

Once the payment is complete, Stripe will redirect to the success_url. If the user cancels the payment, they will be redirected to the cancel_url. These URLs can be customized as needed.
