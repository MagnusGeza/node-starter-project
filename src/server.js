const express = require("express");
const mongoose = require("mongoose");

// const authRouter = require("./routes/authRoute");

const app = express();


mongoose.connect('mongodb+srv://aaa:aaa@cluster0.lwsj4.mongodb.net/db?retryWrites=true&w=majority').then(() => {
  console.log("Database connected");
});

app.use(express.json());

// app.use("/api", authRouter);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});