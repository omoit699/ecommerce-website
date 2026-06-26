import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

class AuthController {
  async register(req, res) {
    try {
      const hashed = await bcrypt.hash(req.body.password, 10);

      const user = await User.create({
        ...req.body,
        password: hashed,
      });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async signin(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user)
        return res.status(404).json({ message: "User not found" });

      const valid = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!valid)
        return res.status(401).json({ message: "Invalid password" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({ user, token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getUser(req, res) {
    const user = await User.findById(req.params.userId);
    res.json(user);
  }

  async logout(req, res) {
    res.json({ message: "Logged out" });
  }
}

export default new AuthController();