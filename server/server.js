const app = require("./src/app");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
