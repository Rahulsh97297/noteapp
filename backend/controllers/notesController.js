// In-memory data store for the assessment
let notes = [];
let currentId = 1;

const getNotes = (req, res) => {
  try {
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createNote = (req, res) => {
  try {
    const { title, content } = req.body;

    // Validation: missing, empty, or whitespace-only title
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required and cannot be empty' });
    }

    const newNote = {
      id: currentId++,
      title: title.trim(),
      content: content ? String(content).trim() : '' // content is optional
    };

    notes.push(newNote);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteNote = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid note ID format' });
    }

    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Remove the note
    notes.splice(noteIndex, 1);

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getNotes,
  createNote,
  deleteNote
};
