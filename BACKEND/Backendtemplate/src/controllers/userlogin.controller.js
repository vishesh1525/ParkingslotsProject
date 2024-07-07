import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
import { createSecretToken } from "../tokenGeneration/generateToken.js";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body; // use email here
  if (!(email && password)) {
    return res.status(400).json(new ApiError(400, "All input is required"));
  }

  try {
    const user = await User.findOne({ email }); // find user by email
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(404).json(new ApiError(404, "Invalid credentials"));
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      domain: process.env.frontend_url, // Set your domain here
      path: "/", // Cookie is accessible from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "None",
    });

    res.json({ token });
  } catch (error) {
    console.error("Got an error", error);
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

export default login;
