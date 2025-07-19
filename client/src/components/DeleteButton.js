import React from 'react';

function DeleteButton({ onDelete }) {
  return (
    <button
      onClick={onDelete}
      style={{
        backgroundColor: '#b43e3c',
        border: 'none',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      Delete
    </button>
  );
}

export default DeleteButton;