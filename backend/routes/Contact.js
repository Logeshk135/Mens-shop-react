import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST message from user
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMsg = new Contact({ name, email, message });
    await newMsg.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
  
});

export default router;
