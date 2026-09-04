import NoteItem from './NoteItem';

function NoteList({ notes, onDelete, deletingIds }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes found. Create your first note above!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      <h2>Your Notes</h2>
      <div className="notes-container">
        {notes.map(note => (
          <NoteItem 
            key={note.id} 
            note={note} 
            onDelete={onDelete} 
            isDeleting={deletingIds.has(note.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;
