const express = require('express');
const router = express.Router();
const { getNotes, createNote, deleteNote } = require('../controllers/notesController');

// Map routes to controller functions
router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:id', deleteNote);

module.exports = router;
