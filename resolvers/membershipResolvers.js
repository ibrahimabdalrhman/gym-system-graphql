const User = require("../models/userModel");
const Membership = require("../models/membershipModel");
const Trainer = require("../models/trainerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const membershipResolvers = {
  getMemberships: async () => {
    return await Membership.find();
  },
  createMembership: async ({ type, price, duration }) => {
    const membership = new Membership({ type, price, duration });
    await membership.save();
    return membership;
  },
};

module.exports = membershipResolvers;
