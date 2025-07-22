import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddAssignmentForm from './components/AddAssignmentForm';
import AssignmentCard from './components/AssignmentCard';
import { askNotificationPermission, notifyIfDueTomorrow } from './components/NotificationHelper';
import AssignmentCalendar from './components/AssignmentCalendar';
import WriteAssignmentPage from './components/WriteAssignmentPage';


function HomePage() {
  const [assignments, setAssignments] = useState([]);
  const [editAssignment, setEditAssignment] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const theme = {
    background: darkMode ? '#121212' : '#989dbc',
    color: darkMode ? '#ffffff' : '#000000',
    cardBackground: darkMode ? '#1e1e1e' : '#ffffff',
    buttonBg: darkMode ? '#bb86fc' : '#6e569c',
    buttonHover: darkMode ? '#9b6ce9' : '#9e5555',
    cardShadow: darkMode ? '0 4px 8px rgba(0,0,0,0.5)' : '0 4px 8px rgba(0,0,0,0.1)',
  };

  useEffect(() => {
    askNotificationPermission();
  }, []);

  useEffect(() => {
    notifyIfDueTomorrow(assignments);
  }, [assignments]);

  const addAssignment = (title, dueDate) => {
    const newAssignment = {
      id: Date.now(),
      title,
      dueDate,
      status: 'Not Started',
    };
    setAssignments([...assignments, newAssignment]);
  };

  const deleteAssignment = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter((a) => a.id !== id));
    }
  };

  const startEditAssignment = (assignment) => {
    setEditAssignment(assignment);
  };

  const saveEditedAssignment = (updated) => {
    setAssignments(assignments.map((a) => (a.id === updated.id ? updated : a)));
    setEditAssignment(null);
  };

  const cancelEdit = () => {
    setEditAssignment(null);
  };

  const updateStatus = (id, newStatus) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.color,
        minHeight: '100vh',
        padding: '40px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
        <h1>📘 Student Assignment Tracker</h1>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#3d5faf',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#5cac5c')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4caf50')}
          >
            Assignment Calendar
          </button>

          <button
            onClick={askNotificationPermission}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#3d5faf',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#5cac5c')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4caf50')}
          >
            Enable Notifications 🔔
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: '8px 16px',
              borderRadius: 9,
              border: 'none',
              backgroundColor: theme.buttonBg,
              color: '#fff',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = theme.buttonHover)}
            onMouseOut={(e) => (e.target.style.backgroundColor = theme.buttonBg)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>

      {showCalendar ? (
        <AssignmentCalendar assignments={assignments} />
      ) : (
        <>
          <AddAssignmentForm
            addAssignment={addAssignment}
            editAssignment={editAssignment}
            saveEditedAssignment={saveEditedAssignment}
            cancelEdit={cancelEdit}
            theme={theme}
          />

          {assignments.length === 0 ? (
            <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No assignments yet.</p>
          ) : (
            assignments.map((a) => (
              <AssignmentCard
                key={a.id}
                assignment={a}
                startEditAssignment={startEditAssignment}
                deleteAssignment={deleteAssignment}
                darkMode={darkMode}
                theme={theme}
                updateStatus={updateStatus}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/write/:id" element={<WriteAssignmentPage />} />

      </Routes>
    </Router>
  );
}

export default App;
