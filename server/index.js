require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require('./router/index')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      console.log("MongoDB connected...")
    );
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (e) {
    console.log("Server error", e);
  }
};
 
start();
