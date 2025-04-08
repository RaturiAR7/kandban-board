const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const protect = async (req, res, next) => {
  let token;
  /////Check if the authorization header is contains bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      ///Extract the token from the header
      token = req.headers.authorization.split(" ")[1];
      ////Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      /////Attach the user to the request object(excluding password)
      req.user = await User.findById(decoded.id).select("-password");
      ///Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
