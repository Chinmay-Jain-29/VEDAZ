require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Expert = require("../models/Expert");
const Booking = require("../models/Booking");

const dummyExperts = [
  {
    name: "Dr. Rahul Sharma",
    category: "Fitness",
    experience: 8,
    rating: 4.8,
    bio: "Certified fitness trainer specializing in strength and conditioning.",
    availableSlots: [
      {
        date: new Date().toISOString().split("T")[0], // Today
        slots: ["09:00 AM", "10:00 AM", "11:00 AM", "04:00 PM"],
      },
      {
        date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
        slots: ["09:00 AM", "10:00 AM", "02:00 PM"],
      },
    ],
  },
  {
    name: "Priya Patel",
    category: "Career",
    experience: 5,
    rating: 4.9,
    bio: "Career counselor helping tech professionals land their dream jobs.",
    availableSlots: [
      {
        date: new Date().toISOString().split("T")[0],
        slots: ["01:00 PM", "02:00 PM", "05:00 PM"],
      },
      {
        date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        slots: ["10:00 AM", "11:00 AM"],
      },
    ],
  },
  {
    name: "Anand Verma",
    category: "Mental Health",
    experience: 12,
    rating: 4.7,
    bio: "Licensed therapist focusing on anxiety and stress management.",
    availableSlots: [
      {
        date: new Date().toISOString().split("T")[0],
        slots: ["08:00 AM", "09:00 AM", "06:00 PM", "07:00 PM"],
      },
    ],
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Expert.deleteMany();
    await Booking.deleteMany();

    await Expert.insertMany(dummyExperts);

    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
