// models/User.js
const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: [true, 'Exam Name is required'],
      trim: true,
    },
    examCenter: {
      type: String,
      required: [true, 'Exam Center is required'],
      trim: true,
    },
    examUrl: {
      type: String,
      required: [true, 'Exam URL is required'],
      default: null,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;