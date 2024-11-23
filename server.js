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
app.set("trust proxy", 1); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());

app.use(
  cors({
    origin: 'https://www.greenwoodsy.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    // origin: ["http://localhost:3000",],
    credentials: true,
  })
);
// app.use(cors({ origin: 'https://www.greenwoodsy.com', credentials: true }));


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
// const userRoute = require("./routes/userRoute");
// const paymentRoutes = require("./routes/paymentRoutes");
// const investmentRoutes = require("./routes/investmentRoutes");
// const withDrawRoutes = require("./routes/withdrawRoutes");
// const errorHandler = require("./middleware/errorMiddleware");
// const seedPlans = require("./utils/seedInvestmentPlans");

// const app = express();

// // Middlewares
// app.set("trust proxy", 1); // Trust proxy for cookies and secure headers
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser(process.env.COOKIE_SECRET)); // Signed cookies
// app.use(bodyParser.json());

// // Configure CORS to allow specific origins
// const allowedOrigins = [
//   "http://localhost:3000", 
//   "https://www.greenwoodsy.com",
//   "https://api.greenwoodsy.com" // Ensure subdomain is also allowed
// ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // Allow credentials (cookies)
//   })
// );

// // Routes
// app.use("/api/users", userRoute);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/invest", investmentRoutes);
// app.use("/api/withDraw", withDrawRoutes);

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

// // Error Handler
// app.use(errorHandler);

// // Define port and connect to MongoDB
// const PORT = process.env.PORT || 8000;

// (async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Database connected successfully");

//     // Seed investment plans if they don't exist
//     await seedPlans();

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Database connection error:", err);
//     process.exit(1); // Exit the application on critical error
//   }
// })();
