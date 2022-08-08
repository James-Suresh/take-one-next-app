const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();


// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const dealMemoRoutes = require("./routes/dealMemo");
const whitelistRoutes = require("./routes/whitelist");
const availablilitiesRoutes = require("./routes/availabilities");

// app middlewares
app.use(morgan("dev"));

// parse application/json
app.use(express.json());

// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: "http://localhost:3000" }));
}

// middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", dealMemoRoutes);
app.use("/api", whitelistRoutes);
app.use("/api", availablilitiesRoutes);

const port = process.env.PORT || 8000;


// connect to database
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    app.listen(port, () => {
      console.log(`API is running on port ${port}`);
    });
  })
  .catch((err) => console.log("DB Error => ", err));