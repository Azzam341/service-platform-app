const Booking = require("../models/Booking");
const Employee = require("../models/Employee");


// ========================================
// GET EMPLOYEE JOBS
// ========================================
exports.getEmployeeJobs = async (req, res) => {
  try {

    const employee = await Employee.findOne({
      userId: req.user.id,
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee profile not found",
      });
    }

    // ========================================
    // IF EMPLOYEE IS BUSY
    // ONLY SHOW CURRENT JOB
    // ========================================
    if (employee.workStatus === "busy") {

      const currentJob = await Booking.findById(
        employee.currentJob
      );

      return res.json({
        message: "Complete current job first",
        currentJob,
      });
    }

    // ========================================
    // ADMIN ASSIGNED JOBS (PRIORITY)
    // ========================================
    const adminAssignedJobs = await Booking.find({
      assignedEmployee: employee._id,
      status: "assigned",
    });

    // ========================================
    // OPEN MARKETPLACE JOBS
    // ========================================
    const availableJobs = await Booking.find({
      status: "pending",
    });

    res.json({
      adminAssignedJobs,
      availableJobs,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ========================================
// ACCEPT JOB
// ========================================
exports.acceptJob = async (req, res) => {

  try {

    const { bookingId } = req.params;

    const employee = await Employee.findOne({
      userId: req.user.id,
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // ========================================
    // PREVENT MULTIPLE ACTIVE JOBS
    // ========================================
    if (employee.workStatus === "busy") {

      return res.status(400).json({
        message: "Finish current job first",
      });

    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found",
      });

    }

    // ========================================
    // ONLY PENDING JOBS CAN BE ACCEPTED
    // ========================================
    if (booking.status !== "pending") {

      return res.status(400).json({
        message: "Job already taken",
      });

    }

    // ========================================
    // ASSIGN JOB
    // ========================================
    booking.assignedEmployee = employee._id;
    booking.status = "accepted";

    // ========================================
    // UPDATE EMPLOYEE STATUS
    // ========================================
    employee.currentJob = booking._id;
    employee.workStatus = "busy";

    await booking.save();
    await employee.save();

    res.json({
      message: "Job accepted successfully",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ========================================
// START JOB
// ========================================
exports.startJob = async (req, res) => {

  try {

    const { bookingId } = req.params;

    const employee = await Employee.findOne({
      userId: req.user.id,
    });

    if (!employee) {

      return res.status(404).json({
        message: "Employee not found",
      });

    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found",
      });

    }

    // ========================================
    // SECURITY CHECK
    // ========================================
    if (
      booking.assignedEmployee.toString() !==
      employee._id.toString()
    ) {

      return res.status(403).json({
        message: "This job is not assigned to you",
      });

    }

    // ========================================
    // ONLY ACCEPTED JOBS CAN START
    // ========================================
    if (booking.status !== "accepted" &&
        booking.status !== "assigned") {

      return res.status(400).json({
        message: "Job cannot be started",
      });

    }

    booking.status = "in_progress";

    await booking.save();

    res.json({
      message: "Job started successfully",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ========================================
// COMPLETE JOB
// ========================================
exports.completeJob = async (req, res) => {

  try {

    const { bookingId } = req.params;

    const employee = await Employee.findOne({
      userId: req.user.id,
    });

    if (!employee) {

      return res.status(404).json({
        message: "Employee not found",
      });

    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found",
      });

    }

    // ========================================
    // SECURITY CHECK
    // ========================================
    if (
      booking.assignedEmployee.toString() !==
      employee._id.toString()
    ) {

      return res.status(403).json({
        message: "This job is not assigned to you",
      });

    }

    // ========================================
    // COMPLETE JOB
    // ========================================
    booking.status = "completed";

    // ========================================
    // FREE EMPLOYEE
    // ========================================
    employee.currentJob = null;
    employee.workStatus = "idle";

    await booking.save();
    await employee.save();

    res.json({
      message: "Job completed successfully",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};