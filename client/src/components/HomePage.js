import React, { useEffect, useState } from 'react';
import AddAssignmentForm from './AddAssignmentForm';

function HomePage() {
  const [assignments, setAssignments] = useState([]);
  const [editAssignment, setEditAssignment] = useState(null);

  // Fetch assignments from backend
  const fetchAssignments = () => {
    fetch('http://localhost:5000/api/assignments')
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error('Error fetching assignments:', err));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Add a new assignment
  const addAssignment = (title, dueDate) => {
    fetch('http://localhost:5000/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, dueDate }),
    })
      .then(res => res.json())
      .then(newAssignment => {
        setAssignments(prev => [...prev, newAssignment]);
      })
      .catch(err => console.error('Error adding assignment:', err));
  };

  // Edit preparation
  const startEditAssignment = (assignment) => {
    setEditAssignment(assignment);
  };

  // Save edited assignment
  const saveEditedAssignment = (updatedAssignment) => {
  fetch(`http://localhost:5000/api/assignments/${updatedAssignment._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAssignment),
  })
    .then(res => res.json())
    .then((updatedFromServer) => {
      setAssignments(prev =>
        prev.map(a => (a._id === updatedFromServer._id ? updatedFromServer : a))
      );
      setEditAssignment(null);
    })
    .catch(err => console.error('Error updating assignment:', err));
};

  // Cancel editing
  const cancelEdit = () => {
    setEditAssignment(null);
  };

  // Delete assignment
  const deleteAssignment = (id) => {
    fetch(`http://localhost:5000/api/assignments/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setAssignments(prev => prev.filter(a => a._id !== id));
      })
      .catch(err => console.error('Error deleting assignment:', err));
  };

  // ✅ Handle status change
  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:5000/api/assignments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(() => {
        setAssignments(prev =>
          prev.map(a => (a._id === id ? { ...a, status: newStatus } : a))
        );
      })
      .catch(err => console.error('Error updating status:', err));
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h1>Student Assignment Tracker</h1>

      <AddAssignmentForm
        addAssignment={addAssignment}
        editAssignment={editAssignment}
        saveEditedAssignment={saveEditedAssignment}
        cancelEdit={cancelEdit}
        theme={{
          cardBackground: '#f8f8f8',
          color: '#333',
          buttonBg: '#007bff',
          buttonHover: '#0056b3',
        }}
      />

      <h3>Your Assignments</h3>
      {assignments.length === 0 ? (
        <p>No assignments found. Add one above!</p>
      ) : (
        assignments.map(assignment => (
          <div
            key={assignment._id}
            style={{
              backgroundColor: '#eee',
              marginBottom: 10,
              padding: 15,
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div>
              <strong>{assignment.title}</strong> — Due:{' '}
              {new Date(assignment.dueDate).toLocaleDateString()}
            </div>

            <div>
              <label>Status: </label>
              <select
                value={assignment.status || 'Not Started'}
                onChange={(e) =>
                  handleStatusChange(assignment._id, e.target.value)
                }
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <button
                onClick={() => startEditAssignment(assignment)}
                style={{ marginRight: 10 }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteAssignment(assignment._id)}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HomePage;
