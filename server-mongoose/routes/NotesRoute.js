const express = require("express");
const router = express.Router();
const Note = require("../models/notes");

// Create a new note
router.post("/add", async (req, res) => {
  try {
    const { noteTitle, noteLink } = req.body;
    const note = new Note({ noteTitle, noteLink });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to add note" });
  }
});

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Edit a note by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const { noteTitle, noteLink } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { noteTitle, noteLink },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Delete a note by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
