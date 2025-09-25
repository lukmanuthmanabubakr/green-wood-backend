require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const paymentRoutes = require("./routes/paymentRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const withDrawRoutes = require("./routes/withdrawRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const seedPlans = require("./utils/seedInvestmentPlans");
const countriesRoutes = require("./routes/countriesRoutes");

const app = express();

// ✅ Trust proxy for secure cookies
app.set("trust proxy", 1);

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());

// ✅ CORS Setup with main + api domains + local dev
app.use(
  cors({
    origin: [
      "https://greenwoodsy.com",     // main site
      "https://api.greenwoodsy.com", // API subdomain
      "http://localhost:3000",       // frontend dev
      "http://localhost:8000",       // backend dev
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// ✅ Handle preflight
app.options(/.*/, cors());

// ✅ Routes
app.use("/api/users", userRoute);
app.use("/api/payments", paymentRoutes);
app.use("/api/invest", investmentRoutes);
app.use("/api/withDraw", withDrawRoutes);
app.use("/api", countriesRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("✅ API is running on Greenwoodsy server");
});

// ✅ Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// ✅ Connect DB + Seed
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(async () => {
    console.log("✅ Database connected");

    // Seed plans if not exists
    await seedPlans();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Database connection error:", err));
