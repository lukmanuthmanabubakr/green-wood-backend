require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require('./routes/userRoute');
const paymentRoutes = require('./routes/paymentRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const withDrawRoutes = require('./routes/withdrawRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const seedPlans = require('./utils/seedInvestmentPlans');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://www.greenwoodsy.com"],
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoute);
app.use("/api/payments", paymentRoutes);
app.use("/api/invest", investmentRoutes);
app.use("/api/withDraw", withDrawRoutes);



app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// Connect to database and seed plans
mongoose.connect(process.env.MONGO_DB_URL).then(async () => {
  console.log("Database connected");

  // Seed investment plans if they don't exist
  await seedPlans();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}).catch((err) => console.error("Database connection error:", err));







// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const userRoute = require('./routes/userRoute');
// const paymentRoutes = require('./routes/paymentRoutes');
// const investmentRoutes = require('./routes/investmentRoutes');
// const withDrawRoutes = require('./routes/withdrawRoutes');
// const errorHandler = require('./middleware/errorMiddleware');
// const seedPlans = require('./utils/seedInvestmentPlans');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(bodyParser.json());

// // Updated CORS Configuration
// const allowedOrigins = ["http://localhost:3000", "https://www.greenwoodsy.com"];
// app.use(cors({
//   origin: (origin, callback) => {
//     // Allow requests from allowed origins or no origin (e.g., mobile apps)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // Allow cookies and credentials
// }));

// // Handle Preflight OPTIONS Requests
// app.options("*", cors()); // Responds to preflight requests for all routes

// // Debugging Middleware (Log Requests)
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   console.log("Headers:", req.headers);
//   next();
// });

// // Routes
// app.use("/api/users", userRoute);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/invest", investmentRoutes);
// app.use("/api/withDraw", withDrawRoutes);

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

// // Error Handling Middleware
// app.use(errorHandler);

// // Connect to Database and Start Server
// const PORT = process.env.PORT || 8000;
// mongoose
//   .connect(process.env.MONGO_DB_URL)
//   .then(async () => {
//     console.log("Database connected");

//     // Seed investment plans if they don't exist
//     await seedPlans();

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Database connection error:", err);
//   });
