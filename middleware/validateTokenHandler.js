// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");

// // Middleware to validate token
// const validateToken = asyncHandler(async (req, res, next) => {
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         res.status(401);
//         throw new Error("User is not Authorized");
//       }
//       req.user = decoded.user; // Correctly setting req.user
//       next();
//     });

//     if (!token) {
//       res.status(401);
//       throw new Error("User not Authorized or Token is missing in the request");
//     }
//   }
// });

// module.exports = validateToken;//Only Temporary
