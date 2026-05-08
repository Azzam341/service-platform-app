const Booking = require("../models/Booking");

// CREATE BOOKING (Customer)
exports.createBooking = async (req, res) => {
  try {
    const { serviceType, description, location, scheduledTime } = req.body;

    const booking = await Booking.create({
      customerId: req.user.id,
      serviceType,
      description,
      location,
      scheduledTime,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customerId", "name email")
      .populate("assignedEmployee");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignEmployee = async (req, res) => {
  try {
    const { bookingId, employeeId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.assignedEmployee = employeeId;
    booking.status = "assigned";

    await booking.save();

    res.json({
      message: "Employee assigned successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignEmployee = async (req, res) => {
  try {
    const { bookingId, employeeId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.assignedEmployee = employeeId;
    booking.status = "assigned";

    await booking.save();

    res.json({
      message: "Employee assigned successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};