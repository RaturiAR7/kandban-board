const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

///Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    ///Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    ///Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    ///Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

////Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    ///Check if user does not exist
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
};
////Get User
const getUser = async (req, res) => {
  res.status(200).json(req.user);
};

////Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getUser };
