const User = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

// Define a schema for registration
const registerSchema = z.object({
  name: z.string().min(1, { error: "Name cannot be empty" }),
  email: z.email({ error: "Invalid email format" }),
  password: z
    .string()
    .min(8, { error: "Password cannot be less than 8 letters" }),
});

const registerUser = async (req, res) => {
  try {
    // Validate request body
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: result.error._zod.def[0].message,
      });
      return;
    }

    // Use validated data instead of req.body
    const { name, email, password } = result.data;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", user });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
    return;
  }
};

const loginSchema = z.object({
  email: z.email({ error: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password cannot be less than 8 letters" }),
});

////Login a user
const loginUser = async (req, res) => {
  try {
    ////Validate using zod
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: result.error._zod.def[0].message,
      });
      return;
    }
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
    res.status(500).json({ message: error.message || "Server Error" });
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
