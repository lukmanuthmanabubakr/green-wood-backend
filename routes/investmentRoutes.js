// routes/investmentRoutes.js
const express = require("express");
const {
  startInvestment,
  getTotalInvestmentAmount,
  investmentHistory,
  checkAndDepositMaturityAmounts,
  getTransactionHistory,
} = require("../controllers/investmentController");
const { protect, verifiedOnly } = require("../middleware/authMiddleware");
const InvestmentPlan = require("../models/InvestmentPlan");

const router = express.Router();


// Route to start an investment
router.post("/start-invest", protect, startInvestment);
router.get(
  "/total-investment",
  protect,
  getTotalInvestmentAmount
);
// router.get("/investment-history", protect, verifiedOnly, investmentHistory);
router.get(
  "/investment-history",
  protect,
  investmentHistory
);
router.get("/deposit-maturity", protect, checkAndDepositMaturityAmounts);
router.get("/getTransactionHistory", protect, getTransactionHistory);



router.get("/plans", async (req, res) => {
  try {
    const plans = await InvestmentPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching investment plans" });
  }
});

module.exports = router;
