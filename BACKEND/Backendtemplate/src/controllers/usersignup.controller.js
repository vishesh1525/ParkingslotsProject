import {User} from "../models/user.models.js";
import { createSecretToken } from "../tokenGeneration/generateToken.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";

export const createUser = async (req, res) => {
  try {
    // Check if all required fields are provided
    const { email, password, fullname, username } = req.body;
    if (!email || !password || !fullname || !username) {
      return res.status(400).json(new ApiError(400, "All input is required"));
    }

    // Check if the user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json(new ApiError(409, "User Already Exist. Please Login"));
    }

    // Hash the password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const user = await newUser.save();

    // Generate a token
    const token = createSecretToken(user._id);

    // Set the cookie
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "None",
    });

    console.log("Cookie set successfully");

    // Respond with the new user object
    res.status(201).json(user);
  } catch (error) {
    console.error("Got an error", error);
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};
