const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceType: {
      type: String,
      required: true, // plumber, cleaner, electrician
    },

    description: {
      type: String,
    },

    location: {
      lat: Number,
      lng: Number,
      address: String,
    },

    scheduledTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "accepted", "in_progress", "completed", "cancelled"],
      default: "pending",
    },

    assignedEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);