const Note = require('../model/notes');

const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.send(notes);
};

const getNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.send(note);
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({
    title,
    content,
  });
  await note.save();
  res.send(note);
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = await Note.findById(id);
  note.title = title;
  note.content = content;
  await note.save();
  res.send(note);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByIdAndDelete(id);
  res.send(note);
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
