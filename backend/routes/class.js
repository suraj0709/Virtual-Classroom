const express = require("express");
const Class = require("../models/Class");
const Unit = require("../models/Unit");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a new class (admin only)
router.post("/", auth, async (req, res) => {
  console.log("User object:", req.user);
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const { title } = req.body;
  try {
    const newClass = new Class({ title });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all classes (accessible to everyone)
router.get("/", auth, async (req, res) => {
  try {
    const classes = await Class.find().populate("units");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update class (admin only)
router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const { title } = req.body;
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete class (admin only)
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
