import React from 'react';
import { useNavigate } from 'react-router-dom';

function AssignmentCard({ assignment, startEditAssignment, deleteAssignment, darkMode, theme, updateStatus }) {
  const navigate = useNavigate(); // ✅ React Router hook to navigate

  const handleStatusChange = (e) => {
    updateStatus(assignment._id, e.target.value); // ✅ Use _id for MongoDB
  };

  return (
    <div
      style={{
        backgroundColor: theme.cardBackground,
        padding: '15px 20px',
        margin: '15px 0',
        borderRadius: 10,
        boxShadow: theme.cardShadow,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <strong style={{ fontSize: '18px' }}>{assignment.title}</strong><br />
        <span style={{ color: darkMode ? '#aaa' : '#777' }}>
          Due: {new Date(assignment.dueDate).toLocaleDateString()}
        </span><br />
        <span style={{ fontWeight: 'bold', color: '#4caf50' }}>{assignment.status}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* ✅ Status dropdown */}
        <select
          value={assignment.status}
          onChange={handleStatusChange}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #ccc',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* ✅ Edit button */}
        <button
          onClick={() => startEditAssignment(assignment)}
          style={{
            backgroundColor: '#2196f3',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Edit
        </button>

        {/* ✅ Delete button */}
        <button
          onClick={() => deleteAssignment(assignment._id)}
          style={{
            backgroundColor: '#e53935',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Delete
        </button>

        {/* ✅ Write page navigation */}
        <button
          onClick={() => navigate(`/write/${assignment._id}`)}
          style={{
            backgroundColor: '#4caf50',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Write
        </button>
      </div>
    </div>
  );
}

export default AssignmentCard;
