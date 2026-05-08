const app = require("./src/app");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const bookingRoutes = require("./src/routes/bookingRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");
const adminRoutes = require("./src/routes/adminRoutes");



dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/admin", adminRoutes);
const { debugLoginTest } = require("./src/controllers/authController");

debugLoginTest();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

