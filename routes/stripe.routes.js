const express = require('express');
const router  = express.Router();


const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51Hj18mJDf1jCzZvmY09MDq0DPLdV3PQCSPkYewUU4C5jWlO7gXHosEPtulOzAl0DpY5IlZUdLcL1RIRMdOYafoHa00VCwHZ150");
router.use(express.static("."));
router.use(express.json());
const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400; //this is 14$
};
router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});


module.exports = router;