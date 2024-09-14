const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    // Verify the token and get the decoded payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Attach the user object from the decoded token to req.user
    req.user = decoded.user; // Correctly reference the 'user' object inside 'decoded'
    console.log("req.user:", req.user); // Now this will print the correct id and role

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   const authHeader = req.header("Authorization");

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Token not found" });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error.message);

//     // Log detailed error
//     return res
//       .status(401)
//       .json({ message: "Invalid token", error: error.message });
//   }
// };

// module.exports = auth;

// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   console.log("Authorization Header:", authHeader); //added

//   // Check if the token is provided and properly formatted
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   // Extract the token
//   const token = authHeader.split(" ")[1];
//   console.log("Extracted Token:", token); //

//   if (!token) {
//     return res.status(401).json({ message: "Token not found" });
//   }

//   try {
//     // Verify the token and extract the payload
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); //

//     // Attach the user object to the request
//     req.user = decoded.user; // Make sure the token has the 'user' payload
//     console.log("req.user:", req.user); //

//     // Move on to the next middleware
//     next();
//   } catch (error) {
//     // Handle token verification errors
//     console.error("Token verification failed:", error.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
