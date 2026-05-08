const express = require("express");
const router = express.Router();

const {
  getEmployeeJobs,
  acceptJob,
  startJob,
  completeJob,
} = require("../controllers/employeeController");

const { isLoggedIn } = require("../middlewares/authMiddleware");

// dashboard
router.get("/jobs", isLoggedIn, getEmployeeJobs);

// actions
router.put("/accept/:bookingId", isLoggedIn, acceptJob);
router.put("/start/:bookingId", isLoggedIn, startJob);
router.put("/complete/:bookingId", isLoggedIn, completeJob);

module.exports = router;