import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "./db.js";

// Chargement des variables d'environnement
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
app.listen(5001, () => {
  connectDB();
  console.log(
    `Server started at ${
      process.env.PORT
        ? "http://localhost:" + process.env.PORT
        : "http://localhost:5001"
    }`
  );
});

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Schemas
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: Date,
  message: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
const Admin = mongoose.model("Admin", adminSchema);

// Create default admin if not exists
async function createDefaultAdmin() {
  try {
    const adminExists = await Admin.findOne({ email: process.env.EMAIL });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await Admin.create({
        email: process.env.EMAIL,
        password: hashedPassword,
      });
      console.log("Default admin created");
    }
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
}

createDefaultAdmin();

// Middleware to verify admin token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Routes
app.post("/api/appointments", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Nouvelle demande de rendez-vous",
      html: `
        <h2>Nouveau rendez-vous</h2>
        <p><strong>Nom:</strong> ${appointment.name}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Téléphone:</strong> ${appointment.phone}</p>
        <p><strong>Date:</strong> ${appointment.date}</p>
        <p><strong>Message:</strong> ${appointment.message}</p>
      `,
    };

    // Send email to user
    const userMailOptions = {
      from: process.env.EMAIL,
      to: appointment.email,
      subject: "Confirmation de demande de rendez-vous",
      html: `
        <h2>Votre demande de rendez-vous a été reçue</h2>
        <p>Nous vous contacterons bientôt pour confirmer votre rendez-vous.</p>
        <p><strong>Date demandée:</strong> ${appointment.date}</p>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      console.log("Provided password:", password);
      console.log("Hashed password in DB:", admin.password);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/appointments", verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.patch("/api/appointments/:id/status", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/admin/me", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId); // Récupère l'admin avec l'ID extrait du token
    res.json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
