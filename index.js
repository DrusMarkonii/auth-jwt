const express = require("express");
const mongoose = require("mongoose");
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://user:user@cluster0.sm3ks.mongodb.net/jwt?retryWrites=true&w=majority",
      console.log('MongoDB connected...')
    );
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (e) {
    console.log("Server error", e);
  }
};

start();

