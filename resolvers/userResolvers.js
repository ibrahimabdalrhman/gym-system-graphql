const User = require("../models/userModel");
const Membership = require("../models/membershipModel");
const Trainer = require("../models/trainerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userResolvers = {
  registerUser: async ({ fullName, username, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, username, password: hashedPassword });
    await user.save();
    return user;
  },
  login: async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  },

  getUser: async ({ username }) => {
    return await User.findOne({ username });
  },
};

module.exports = userResolvers;
