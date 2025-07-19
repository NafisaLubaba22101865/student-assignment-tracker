import React, { useState, useEffect } from 'react';


function AddAssignmentForm({ addAssignment, editAssignment, saveEditedAssignment, cancelEdit, theme }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editAssignment) {
      setTitle(editAssignment.title);
      setDueDate(editAssignment.dueDate);
    } else {
      setTitle('');
      setDueDate('');
    }
  }, [editAssignment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Please fill all fields');
      return;
    }
    if (editAssignment) {
      saveEditedAssignment({ ...editAssignment, title, dueDate });
    } else {
      addAssignment(title, dueDate);
    }
    setTitle('');
    setDueDate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }}
    >
      <input
        type="text"
        placeholder="Assignment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: 10,
          borderRadius: 8,
          border: '1px solid #ccc',
          width: '220px',
          backgroundColor: theme.cardBackground,
          color: theme.color
        }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{
          padding: 10,
          borderRadius: 8,
          border: '1px solid #ccc',
          width: '160px',
          backgroundColor: theme.cardBackground,
          color: theme.color
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: 'none',
          backgroundColor: theme.buttonBg,
          color: '#fff',
          cursor: 'pointer',
          transition: '0.3s'
        }}
        onMouseOver={e => (e.target.style.backgroundColor = theme.buttonHover)}
        onMouseOut={e => (e.target.style.backgroundColor = theme.buttonBg)}
      >
        {editAssignment ? '💾 Save' : '➕ Add'}
      </button>

      {editAssignment && (
        <button
          type="button"
          onClick={cancelEdit}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            backgroundColor: '#f1bcbc',
            color: '#ddc4c4',
            cursor: 'pointer',
            transition: '0.3s',
            marginLeft: 10
          }}
          onMouseOver={e => (e.target.style.backgroundColor = '#555')}
          onMouseOut={e => (e.target.style.backgroundColor = '#777')}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default AddAssignmentForm;
