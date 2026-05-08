const express = require("express");
const router = express.Router();

const {
  createEmployee,
} = require("../controllers/adminController");

const {
  isLoggedIn,
  isAdmin,
} = require("../middlewares/authMiddleware");

// ADMIN → CREATE EMPLOYEE
router.post("/employee", isLoggedIn, isAdmin, createEmployee);

module.exports = router;