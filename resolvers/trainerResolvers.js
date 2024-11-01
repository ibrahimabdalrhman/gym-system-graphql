const User = require("../models/userModel");
const Membership = require("../models/membershipModel");
const Trainer = require("../models/trainerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const trainerResolvers = {
  createMembership: async ({ type, price, duration }) => {
    const membership = new Membership({ type, price, duration });
    await membership.save();
    return membership;
  },
  getTrainers: async () => {
    return await Trainer.find();
  },
  createTrainer: async ({ name, specialization, experience }) => {
    const trainer = new Trainer({ name, specialization, experience });
    await trainer.save();
    return trainer;
  },
};

module.exports = trainerResolvers;
