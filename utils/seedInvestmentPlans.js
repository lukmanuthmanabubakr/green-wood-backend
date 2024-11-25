// utils/seedInvestmentPlans.js
const mongoose = require("mongoose");
const InvestmentPlan = require("../models/InvestmentPlan");

const seedPlans = async () => {
  const plans = [
    {
      name: "Starter Plan",
      minAmount: 100,
      maxAmount: 500,
      durationDays: 1,
      interestRate: 12,
    },
    {
      name: "Bronze Plan",
      minAmount: 500,
      maxAmount: 1500,
      durationDays: 3,
      interestRate: 15,
    },
    {
      name: "Silver Plan",
      minAmount: 2000,
      maxAmount: 5000,
      durationDays: 5,
      interestRate: 18,
    },
    {
      name: "Gold Plan",
      minAmount: 5000,
      maxAmount: 10000,
      durationDays: 7,
      interestRate: 20,
    },
    {
      name: "Diamond Plan",
      minAmount: 10000,
      maxAmount: 50000,
      durationDays: 9,
      interestRate: 23,
    },
    {
      name: "Platinum Plan",
      minAmount: 50000,
      maxAmount: 100000,
      durationDays: 11,
      interestRate: 27,
    },
  ];

  try {
    for (const plan of plans) {
      const existingPlan = await InvestmentPlan.findOne({ name: plan.name });
      if (!existingPlan) {
        await InvestmentPlan.create(plan);
        console.log(`Added plan: ${plan.name}`);
      } else {
        console.log(`Plan ${plan.name} already exists`);
      }
    }
    console.log("Investment plans seeded successfully!");
  } catch (error) {
    console.error("Error seeding investment plans:", error);
  }
};

module.exports = seedPlans;
