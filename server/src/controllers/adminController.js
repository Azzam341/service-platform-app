const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

// CREATE EMPLOYEE (ADMIN ONLY)
exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      serviceAreas,
      skills,
      location,
    } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
      location,
    });

    // 4. Create employee profile
    const employee = await Employee.create({
      userId: user._id,
      phone,
      serviceAreas,
      skills,
      location,
    });

    res.status(201).json({
      message: "Employee created successfully",
      user,
      employee,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};