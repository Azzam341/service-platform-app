const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    phone: String,

    serviceAreas: [
      {
        type: String, // e.g. plumbing, cleaning
      },
    ],

    skills: [String],

    availability: [
      {
        day: String,
        slots: [String], // e.g. ["10-12", "2-4"]
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        customerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        rating: Number,
      },
    ],

        currentJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },

    workStatus: {
      type: String,
      enum: ["idle", "busy"],
      default: "idle",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);