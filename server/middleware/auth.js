const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.authToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized request: Token missing" });
    }

    const decodedToken = jwt.decode(token);
    

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    console.log(user)

    if (!user) {
      return res.status(401).json({ message: "Invalid User" });
    }

    req.user = user;
    req.accessToken = token;
    next();
  } catch (error) {
    console.error('Error during token decoding:', error);
    return res.status(401).json({ message: "Invalid Token" });
  }
});

module.exports = verifyJwt;
