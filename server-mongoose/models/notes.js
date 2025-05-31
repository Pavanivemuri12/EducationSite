const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true,
  },
  noteLink: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,   // Mark required since frontend expects this
    enum: ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"], // Optional: enforce valid sections
  },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
