import React, { useEffect, useState } from 'react';
import AddAssignmentForm from './AddAssignmentForm';

function HomePage() {
  const [assignments, setAssignments] = useState([]);
  const [editAssignment, setEditAssignment] = useState(null);

  // Fetch all assignments from backend
  const fetchAssignments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/assignments');
      const data = await res.json();
      setAssignments(data);
      console.log('Assignments fetched:', data); // ✅ debug
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Add a new assignment
  const addAssignment = async (title, dueDate) => {
    try {
      const res = await fetch('http://localhost:5000/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, dueDate })
      });
      const newAssignment = await res.json();
      setAssignments(prev => [...prev, newAssignment]);
    } catch (err) {
      console.error('Error adding assignment:', err);
    }
  };

  // Start editing
  const startEditAssignment = (assignment) => {
    setEditAssignment(assignment);
  };

  // Save edited assignment
  const saveEditedAssignment = async (updatedAssignment) => {
    try {
      const res = await fetch(`http://localhost:5000/api/assignments/${updatedAssignment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAssignment)
      });
      const updatedFromServer = await res.json();
      setAssignments(prev =>
        prev.map(a => a._id === updatedFromServer._id ? updatedFromServer : a)
      );
      setEditAssignment(null);
    } catch (err) {
      console.error('Error updating assignment:', err);
    }
  };

  // Cancel edit
  const cancelEdit = () => setEditAssignment(null);

  // Delete assignment
  const deleteAssignment = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/assignments/${id}`, { method: 'DELETE' });
      setAssignments(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      console.error('Error deleting assignment:', err);
    }
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/assignments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setAssignments(prev =>
        prev.map(a => a._id === id ? { ...a, status: newStatus } : a)
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Update grade
  const handleGradeUpdate = async (id, grade) => {
    try {
      const res = await fetch(`http://localhost:5000/api/assignments/${id}/grade`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade: Number(grade) })
      });
      const updatedAssignment = await res.json();
      setAssignments(prev =>
        prev.map(a => a._id === id ? updatedAssignment : a)
      );
    } catch (err) {
      console.error('Error updating grade:', err);
    }
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
        assignments.map(a => (
          <div
            key={a._id}
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
              <strong>{a.title}</strong> <br />
              Due: {new Date(a.dueDate).toLocaleDateString()} <br />
              Status: {a.status} <br />
              Grade: {a.grade !== null ? a.grade : 'Not graded yet'} {/* ✅ show grade */}
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <select
                value={a.status || 'Not Started'}
                onChange={(e) => handleStatusChange(a._id, e.target.value)}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <input
                type="number"
                placeholder="Enter grade"
                value={a.grade || ''}
                onChange={(e) => handleGradeUpdate(a._id, e.target.value)}
                style={{ width: '80px' }}
              />

              <button onClick={() => startEditAssignment(a)}>Edit</button>
              <button
                onClick={() => deleteAssignment(a._id)}
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
