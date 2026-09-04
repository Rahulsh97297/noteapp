function NoteItem({ note, onDelete, isDeleting }) {
  return (
    <div className="note-item">
      <div className="note-body">
        <h3>{note.title}</h3>
        {note.content && <p>{note.content}</p>}
      </div>
      <button 
        onClick={() => onDelete(note.id)} 
        disabled={isDeleting}
        className="delete-btn"
        aria-label="Delete note"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

export default NoteItem;
