import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddAssignmentForm from './components/AddAssignmentForm';
import AssignmentCard from './components/AssignmentCard';
import { askNotificationPermission, notifyIfDueTomorrow } from './components/NotificationHelper';
import AssignmentCalendar from './components/AssignmentCalendar';
import WriteAssignmentPage from './components/WriteAssignmentPage';
import StudyTimeDashboard from './components/StudyTimeDashboard';
import ThemeManager from './components/ThemeManager';
import AssignmentStats from './components/AssignmentStats';
import GradeTracker from './components/GradeTracker';

function HomePage() {
  const [assignments, setAssignments] = useState([]);
  const [editAssignment, setEditAssignment] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showThemeManager, setShowThemeManager] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showGradeTracker, setShowGradeTracker] = useState(false);

  // Load theme from localStorage or use default
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('assignment-tracker-theme');
    if (savedTheme) {
      return JSON.parse(savedTheme);
    }
    return {
      background: darkMode ? '#121212' : '#989dbc',
      color: darkMode ? '#ffffff' : '#000000',
      cardBackground: darkMode ? '#1e1e1e' : '#ffffff',
      buttonBg: darkMode ? '#bb86fc' : '#6e569c',
      buttonHover: darkMode ? '#9b6ce9' : '#9e5555',
      cardShadow: darkMode ? '0 4px 8px rgba(0,0,0,0.5)' : '0 4px 8px rgba(0,0,0,0.1)',
    };
  });

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('assignment-tracker-theme', JSON.stringify(theme));
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  // Fetch assignments from backend
  const fetchAssignments = () => {
    fetch('http://localhost:5000/api/assignments')
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error('Error fetching assignments:', err));
  };

  useEffect(() => {
    askNotificationPermission();
    fetchAssignments();
  }, []);

  useEffect(() => {
    notifyIfDueTomorrow(assignments);
  }, [assignments]);

  // Add assignment to backend
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

  // Delete assignment from backend
  const deleteAssignment = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      fetch(`http://localhost:5000/api/assignments/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
          setAssignments(prev => prev.filter(a => a._id !== id));
        })
        .catch(err => console.error('Error deleting assignment:', err));
    }
  };

  // Prepare to edit assignment
  const startEditAssignment = (assignment) => {
    setEditAssignment(assignment);
  };

  // Save edited assignment to backend
  const saveEditedAssignment = (updated) => {
    fetch(`http://localhost:5000/api/assignments/${updated._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
      .then(res => res.json())
      .then(() => {
        setAssignments(prev =>
          prev.map(a => (a._id === updated._id ? updated : a))
        );
        setEditAssignment(null);
      })
      .catch(err => console.error('Error updating assignment:', err));
  };

  const cancelEdit = () => {
    setEditAssignment(null);
  };

  // Update status locally (optional: sync with backend if you have API for this)
  const updateStatus = (id, newStatus) => {
    setAssignments(prev =>
      prev.map(a => (a._id === id ? { ...a, status: newStatus } : a))
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
              backgroundColor: theme.buttonBg,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = theme.buttonHover)}
            onMouseOut={(e) => (e.target.style.backgroundColor = theme.buttonBg)}
          >
            📅 Calendar
          </button>

          <button
            onClick={() => setShowThemeManager(!showThemeManager)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: theme.buttonBg,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = theme.buttonHover)}
            onMouseOut={(e) => (e.target.style.backgroundColor = theme.buttonBg)}
          >
            🎨 Themes
          </button>

          <button
            onClick={() => setShowStats(!showStats)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: theme.buttonBg,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = theme.buttonHover)}
            onMouseOut={(e) => (e.target.style.backgroundColor = theme.buttonBg)}
          >
            📊 Stats
          </button>

          <button
            onClick={() => setShowGradeTracker(!showGradeTracker)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: theme.buttonBg,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = theme.buttonHover)}
            onMouseOut={(e) => (e.target.style.backgroundColor = theme.buttonBg)}
          >
            📝 Grades
          </button>

          <button
            onClick={askNotificationPermission}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: theme.buttonBg,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = theme.buttonHover)}
            onMouseOut={(e) => (e.target.style.backgroundColor = theme.buttonBg)}
          >
            🔔 Notifications
          </button>
        </div>
      </div>

      {showCalendar ? (
        <AssignmentCalendar assignments={assignments} />
      ) : showThemeManager ? (
        <ThemeManager currentTheme={theme} onThemeChange={handleThemeChange} />
      ) : showStats ? (
        <AssignmentStats assignments={assignments} theme={theme} />
      ) : showGradeTracker ? (
        <GradeTracker 
          assignments={assignments} 
          onAssignmentUpdate={(updatedAssignment) => {
            setAssignments(prev =>
              prev.map(assignment => 
                assignment._id === updatedAssignment._id ? updatedAssignment : assignment
              )
            );
          }}
          theme={theme} 
        />
      ) : (
        <>
          <StudyTimeDashboard assignments={assignments} theme={theme} />
          
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
                key={a._id}
                assignment={a}
                startEditAssignment={startEditAssignment}
                deleteAssignment={deleteAssignment}
                darkMode={darkMode}
                theme={theme}
                updateStatus={updateStatus}
                onAssignmentUpdate={(updatedAssignment) => {
                  setAssignments(prev =>
                    prev.map(assignment => 
                      assignment._id === updatedAssignment._id ? updatedAssignment : assignment
                    )
                  );
                }}
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