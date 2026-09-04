import { useState } from 'react';

function NoteForm({ onSubmit, isSubmitting }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Frontend validation
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setLocalError('Title cannot be empty');
      return;
    }

    setLocalError('');
    
    const success = await onSubmit({ title: trimmedTitle, content: content.trim() });
    
    // Only clear form if creation was successful
    if (success) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>Add a New Note</h2>
      {localError && <div className="error-message">{localError}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title <span className="required">*</span></label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (localError) setLocalError('');
          }}
          disabled={isSubmitting}
          placeholder="Enter note title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          placeholder="Enter note content (optional)"
          rows="4"
        />
      </div>

      <button type="submit" disabled={isSubmitting || !title.trim()}>
        {isSubmitting ? 'Adding...' : 'Add Note'}
      </button>
    </form>
  );
}

export default NoteForm;
