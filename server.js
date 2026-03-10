const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express(); // ⚠️ D’ABORD express

// ===== Middlewares =====
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim()).filter(Boolean)
  : "*";

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));if (!process.env.MONGO_URI) {
  console.error("❌ Missing env var: MONGO_URI");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("❌ Missing env var: JWT_SECRET");
  process.exit(1);
}

// ===== DB =====
connectDB();

// ===== ROUTES =====
const userRoutes = require("./routes/userRoutes");
const formationRoutes = require("./routes/formationRoutes");
const authRoutes = require("./routes/authRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/users", userRoutes);
app.use("/api/formations", formationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/projects", projectRoutes);

// ===== ROOT =====
app.get("/", (req, res) => {
  res.send("API Academy fonctionne ✅");
});

// ===== 404 =====
app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    message: err.message || "Erreur serveur",
  });
});

// ===== SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
