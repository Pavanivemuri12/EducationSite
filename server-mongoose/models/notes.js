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
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
