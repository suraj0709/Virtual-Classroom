const express = require("express");
const Comment = require("../models/Comment");
const Session = require("../models/Session");
const auth = require("../middleware/auth");
const router = express.Router();

// Add a comment to a session
router.post("/:sessionId", auth, async (req, res) => {
  const { content } = req.body;
  try {
    const newComment = new Comment({ content, user: req.user.id });
    const savedComment = await newComment.save();

    const sessionObj = await Session.findById(req.params.sessionId);
    sessionObj.comments.push(savedComment._id);
    await sessionObj.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
