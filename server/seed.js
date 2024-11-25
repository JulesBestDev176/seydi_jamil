import mongoose from "mongoose";
import { connectDB } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

// Schema et modèle de rendez-vous
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

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Données fictives
const seedAppointments = [
  {
    name: "Alice Dupont",
    email: "alice.dupont@example.com",
    phone: "123456789",
    date: new Date("2024-11-28T10:00:00"),
    message: "Demande de rendez-vous pour un projet urgent.",
    status: "pending",
  },
  {
    name: "Bob Martin",
    email: "bob.martin@example.com",
    phone: "987654321",
    date: new Date("2024-11-29T14:00:00"),
    message: "Besoin d'une consultation technique.",
    status: "confirmed",
  },
  {
    name: "Claire Durand",
    email: "claire.durand@example.com",
    phone: "456123789",
    date: new Date("2024-11-30T16:30:00"),
    message: "Discussion sur un partenariat potentiel.",
    status: "cancelled",
  },
];

async function seedDB() {
  try {
    // Connexion à MongoDB
    await connectDB();

    // Supprime les rendez-vous existants si nécessaire
    await Appointment.deleteMany();
    console.log("Les rendez-vous existants ont été supprimés.");

    // Ajout des rendez-vous
    await Appointment.insertMany(seedAppointments);
    console.log("Les rendez-vous fictifs ont été ajoutés.");
  } catch (error) {
    console.error("Erreur lors de l'ajout des rendez-vous :", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
