import { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote } from './api/notes';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './index.css'; // Importing CSS here or in main.jsx

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track submission and deletion states separately for UI feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingIds, setDeletingIds] = useState(new Set());

  // Fetch notes on initial load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError(err.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (noteData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const newNote = await createNote(noteData);
      setNotes(prevNotes => [...prevNotes, newNote]);
      return true; // Return success status to the form
    } catch (err) {
      setError(err.message || 'Failed to create note');
      return false; // Return failure status
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      setDeletingIds(prev => new Set(prev).add(id));
      setError(null);
      
      await deleteNote(id);
      
      // Remove deleted note from state
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete note');
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Notes App</h1>
      </header>

      <main>
        {error && <div className="error-banner">{error}</div>}
        
        <section className="form-section">
          <NoteForm onSubmit={handleAddNote} isSubmitting={isSubmitting} />
        </section>

        <section className="list-section">
          {loading ? (
            <div className="loading-state">Loading your notes...</div>
          ) : (
            <NoteList 
              notes={notes} 
              onDelete={handleDeleteNote} 
              deletingIds={deletingIds}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
