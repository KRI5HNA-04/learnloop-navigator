const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Below middleware is used to parse the data from the cookie
app.use(cookieParser());

// const allowedOrigins = [
//   "http://localhost:8080/",
//   "http://localhost:8080/login",
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

const allowedOrigins = ["http://localhost:8080"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle OPTIONS requests for CORS preflight
app.options("*", cors());

// Below two middlewares are used to read 'req.body'
app.use(
  express.json({
    limit: "10kb",
  })
);

// This one is specially made for HTML forms.
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/user", userRouter);

module.exports = app;
