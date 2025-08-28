import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudyTimeTracker from './StudyTimeTracker';

function AssignmentCard({ assignment, startEditAssignment, deleteAssignment, darkMode, theme, updateStatus, updateGrade, onAssignmentUpdate }) {
  const navigate = useNavigate();
  const [grade, setGrade] = useState(assignment.grade || ""); // ✅ local state for grade
  const [showStudyTracker, setShowStudyTracker] = useState(false);

  const handleStatusChange = (e) => {
    updateStatus(assignment._id, e.target.value);
  };

  const handleGradeSave = () => {
    if (grade === "") return;
    updateGrade(assignment._id, grade); // ✅ Call parent handler
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
        <span style={{ fontWeight: 'bold', color: '#4caf50' }}>{assignment.status}</span><br />

        {/* ✅ Show grade if exists */}
        {assignment.grade !== null && (
          <span style={{ 
            fontWeight: 'bold', 
            color: assignment.grade >= 90 ? '#28a745' : 
                   assignment.grade >= 80 ? '#17a2b8' : 
                   assignment.grade >= 70 ? '#ffc107' : 
                   assignment.grade >= 60 ? '#fd7e14' : '#dc3545',
            fontSize: '16px'
          }}>
            Grade: {assignment.grade}% ({assignment.grade >= 90 ? 'A' : 
                                       assignment.grade >= 80 ? 'B' : 
                                       assignment.grade >= 70 ? 'C' : 
                                       assignment.grade >= 60 ? 'D' : 'F'})
          </span>
        )}
        
        {/* ✅ Show study time if exists */}
        {assignment.studyTime && assignment.studyTime.totalHours > 0 && (
          <span style={{ fontWeight: 'bold', color: '#9c27b0', marginLeft: '10px' }}>
            ⏱️ {assignment.studyTime.totalHours.toFixed(1)}h
          </span>
        )}
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

        {/* ✅ Grade input */}
        <input
          type="number"
          placeholder="Enter Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{
            padding: '6px',
            borderRadius: 6,
            border: '1px solid #ccc',
            width: '80px',
          }}
        />
        <button
          onClick={handleGradeSave}
          style={{
            backgroundColor: '#ff9800',
            border: 'none',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Save Grade
        </button>

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

        {/* ✅ Study Time Tracker button */}
        <button
          onClick={() => setShowStudyTracker(!showStudyTracker)}
          style={{
            backgroundColor: '#9c27b0',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ⏱️ Study Time
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

      {/* Study Time Tracker */}
      {showStudyTracker && (
        <StudyTimeTracker 
          assignment={assignment} 
          onUpdate={onAssignmentUpdate}
          theme={theme}
        />
      )}
    </div>
  );
}

export default AssignmentCard;
