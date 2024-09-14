const express = require("express");
const Unit = require("../models/Unit");
const Session = require("../models/Session");
const auth = require("../middleware/auth");
const router = express.Router();

// Add a session to a unit (admin only)
router.post("/:unitId", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const { title, content } = req.body;
  try {
    const newSession = new Session({ title, content });
    const savedSession = await newSession.save();

    const unitObj = await Unit.findById(req.params.unitId);
    unitObj.sessions.push(savedSession._id);
    await unitObj.save();

    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sessions of a unit
router.get("/:unitId", auth, async (req, res) => {
  try {
    const unitObj = await Unit.findById(req.params.unitId).populate("sessions");
    res.status(200).json(unitObj.sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
