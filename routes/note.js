const express = require('express');
const router = express.Router();

const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require('../controller/note');

router.route('/').get(getAllNotes);
// router.route('/:id').get(getNote);
router.route('/').post(createNote);
router.route('/:id').put(updateNote);
router.route('/:id').delete(deleteNote);

module.exports = router;
