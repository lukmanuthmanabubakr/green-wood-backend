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

// ✅ Set trust proxy for secure cookies in production
app.set("trust proxy", 1);

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());

// ✅ CORS Setup to allow cookies
app.use(
  cors({
    origin: [
      "https://greenwoodsy.com",
      "http://localhost:3000",
      "http://localhost:8000",
      "https://api.greenwoodsy.com",
    ],
    credentials: true, // ✅ Allows sending cookies with requests
  })
);

// ✅ Routes
app.use("/api/users", userRoute);
app.use("/api/payments", paymentRoutes);
app.use("/api/invest", investmentRoutes);
app.use("/api/withDraw", withDrawRoutes);
app.use("/api", countriesRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// ✅ Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// ✅ Connect to database and seed plans
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(async () => {
    console.log("✅ Database connected");

    // ✅ Seed investment plans if they don't exist
    await seedPlans();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Database connection error:", err));
