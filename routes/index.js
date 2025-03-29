var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_test_51R84WoGfdMY1QgMrFP2bZsdrP6P2tZXaEsqtex7Qo5Qi73KBGbzxJDQQpkyBGDMTKWMRzD5jMfdep4FSQsMEaHAW00xyTdTdpZ');

/* GET home page */
router.get('/', function(req, res, next) {
    res.render('index');
});

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

module.exports = router;
