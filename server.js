const express = require("express");
const connectDb = require("./config/dbConnection");
// const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/contacts", require("./routes/contactRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));//Only Temporary
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
