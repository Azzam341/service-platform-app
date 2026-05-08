const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  assignEmployee,
} = require("../controllers/bookingController");

const {
  isLoggedIn,
  isAdmin,
} = require("../middlewares/authMiddleware");

// CUSTOMER
router.post("/", isLoggedIn, createBooking);

// ADMIN
router.get("/", isLoggedIn, isAdmin, getAllBookings);
router.put("/assign", isLoggedIn, isAdmin, assignEmployee);

module.exports = router;