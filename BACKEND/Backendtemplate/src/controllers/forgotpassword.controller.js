import { User } from '../models/user.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Existing createUser function ...

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json("Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });

    // Send the reset token back in the response
    res.status(200).json({ resetToken });
  } catch (error) {
    console.error("Forgot password error", error);
    res.status(500).json("Internal Server Error");
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json("All inputs are required");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (error) {
      return res.status(400).json("Invalid or expired token");
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json("Password has been reset successfully");
  } catch (error) {
    console.error("Reset password error", error);
    res.status(500).json("Internal Server Error");
  }
};
