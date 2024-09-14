const express = require("express");
const Class = require("../models/Class");
const Unit = require("../models/Unit");
const auth = require("../middleware/auth");
const router = express.Router();

// Add a unit to a class (admin only)
router.post("/:classId", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const { title } = req.body;
  try {
    const newUnit = new Unit({ title });
    const savedUnit = await newUnit.save();

    const classObj = await Class.findById(req.params.classId);
    classObj.units.push(savedUnit._id);
    await classObj.save();

    res.status(201).json(savedUnit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all units of a class
router.get("/:classId", auth, async (req, res) => {
  try {
    const classObj = await Class.findById(req.params.classId).populate("units");
    res.status(200).json(classObj.units);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
