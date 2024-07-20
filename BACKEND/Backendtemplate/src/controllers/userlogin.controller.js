import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
import { createSecretToken } from "../tokenGeneration/generateToken.js";
import jwt from "jsonwebtoken";
dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body; // use email here
  if (!(email && password)) {
    return res.status(400).json(new ApiError(400, "All input is required"));
  }

  try {
    const user = await User.findOne({ email }); // find user by email
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      console.log("Password not matching");
      return res.status(404).json("Invalid credentials");
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

    console.log("User registered successfully");
    res.json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        role: user.role,
        // phonenos: user.phonenos
      }
    });
  } catch (error) {
    console.error("Got an error", error);
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

export const Verification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        return res.json({ status: true, user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          role: user.role,
          phonenos: user.phonenos
        } });
      } else {
        return res.json({ status: false });
      }
    }
  });
};

export default login;
