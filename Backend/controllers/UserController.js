const User = require("../models/UserModel.js");
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
    const hashedPassword = await bcrypt.hash(password, 10);
    ///Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user", error });
  }
};
