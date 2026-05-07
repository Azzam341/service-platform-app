const express = require("express");
const router = express.Router();

const {
  registerCustomer,
  loginUser,
} = require("../controllers/authController");

const {
  isLoggedIn,
  isAdmin,
} = require("../middlewares/authMiddleware");

// PUBLIC ROUTES
router.post("/register", registerCustomer);
router.post("/login", loginUser);

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Auth API working");
});

// PROTECTED ROUTE
router.get("/profile", isLoggedIn, (req, res) => {
  res.json({
    message: "User profile accessed",
    user: req.user,
  });
});

// ADMIN ROUTE
router.get("/admin", isLoggedIn, isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin Panel",
  });
});

module.exports = router;