const express = require("express");
const router = express.Router();
const { createTransaction, confirmPayment, viewPaymentStatus } = require("../controllers/paymentController");
const {
    protect,
    adminOnly,
    verifiedOnly,
  } = require("../middleware/authMiddleware");


// Route to create a transaction (user submits a payment)
router.post("/create", protect, createTransaction);

// Route to confirm a payment (admin confirms payment)
router.patch("/confirmPayment", protect, adminOnly, confirmPayment);
router.get("/viewPaymentStatus/:transactionId", protect, adminOnly, viewPaymentStatus);


module.exports = router;
