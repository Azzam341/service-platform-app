const jwt = require("jsonwebtoken");

// AUTH CHECK
exports.isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user payload (id, role)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ADMIN CHECK
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied (admin only)" });
  }
  next();
};
