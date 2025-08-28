import React, { useState } from 'react';

function GradeTracker({ assignments, onAssignmentUpdate, theme }) {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [gradeInput, setGradeInput] = useState('');
  const [gradeNotes, setGradeNotes] = useState('');

  // Filter assignments that can be graded (completed or have grades)
  const gradableAssignments = assignments.filter(a => 
    a.status === 'Completed' || a.grade !== null
  );

  const handleGradeSubmit = async (assignmentId) => {
    if (!gradeInput || isNaN(gradeInput) || gradeInput < 0 || gradeInput > 100) {
      alert('Please enter a valid grade between 0 and 100');
      return;
    }

    const grade = parseFloat(gradeInput);
    
    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${assignmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grade: grade,
          gradeNotes: gradeNotes
        }),
      });

      if (response.ok) {
        const updatedAssignment = await response.json();
        onAssignmentUpdate(updatedAssignment);
        setGradeInput('');
        setGradeNotes('');
        setSelectedAssignment(null);
      } else {
        alert('Failed to update grade');
      }
    } catch (error) {
      console.error('Error updating grade:', error);
      alert('Error updating grade');
    }
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return '#28a745'; // Green for A
    if (grade >= 80) return '#17a2b8'; // Blue for B
    if (grade >= 70) return '#ffc107'; // Yellow for C
    if (grade >= 60) return '#fd7e14'; // Orange for D
    return '#dc3545'; // Red for F
  };

  const getGradeLetter = (grade) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  return (
    <div style={{
      backgroundColor: theme.cardBackground,
      padding: '20px',
      borderRadius: '10px',
      boxShadow: theme.cardShadow,
      marginBottom: '20px',
      border: `1px solid ${theme.color}20`
    }}>
      <h2 style={{ 
        marginTop: 0, 
        color: theme.color, 
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        📝 Grade Tracker
      </h2>

      {/* Grade Input Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: theme.color, marginBottom: '15px' }}>Enter Grades</h3>
        <div style={{
          backgroundColor: `${theme.color}10`,
          padding: '15px',
          borderRadius: '8px',
          border: `1px solid ${theme.color}30`
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              color: theme.color, 
              fontWeight: 'bold', 
              display: 'block', 
              marginBottom: '5px' 
            }}>
              Select Assignment:
            </label>
            <select
              value={selectedAssignment || ''}
              onChange={(e) => setSelectedAssignment(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: `1px solid ${theme.color}40`,
                backgroundColor: theme.cardBackground,
                color: theme.color
              }}
            >
              <option value="">Choose an assignment...</option>
              {assignments
                .filter(a => a.status === 'Completed')
                .map(assignment => (
                  <option key={assignment._id} value={assignment._id}>
                    {assignment.title} {assignment.grade ? `(Current: ${assignment.grade}%)` : ''}
                  </option>
                ))}
            </select>
          </div>

          {selectedAssignment && (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ 
                  color: theme.color, 
                  fontWeight: 'bold', 
                  display: 'block', 
                  marginBottom: '5px' 
                }}>
                  Grade (%):
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  placeholder="Enter grade (0-100)"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: `1px solid ${theme.color}40`,
                    backgroundColor: theme.cardBackground,
                    color: theme.color
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ 
                  color: theme.color, 
                  fontWeight: 'bold', 
                  display: 'block', 
                  marginBottom: '5px' 
                }}>
                  Notes (Optional):
                </label>
                <textarea
                  value={gradeNotes}
                  onChange={(e) => setGradeNotes(e.target.value)}
                  placeholder="Add notes about the grade..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: `1px solid ${theme.color}40`,
                    backgroundColor: theme.cardBackground,
                    color: theme.color,
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                onClick={() => handleGradeSubmit(selectedAssignment)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: theme.buttonBg,
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '100%'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = theme.buttonHover}
                onMouseOut={(e) => e.target.style.backgroundColor = theme.buttonBg}
              >
                Save Grade
              </button>
            </>
          )}
        </div>
      </div>

      {/* Grade Summary */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: theme.color, marginBottom: '15px' }}>Grade Summary</h3>
        {gradableAssignments.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: theme.color,
            backgroundColor: `${theme.color}10`,
            borderRadius: '8px',
            border: `1px solid ${theme.color}30`
          }}>
            No graded assignments yet. Complete assignments to start tracking grades!
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px'
          }}>
            {gradableAssignments.map(assignment => (
              <div
                key={assignment._id}
                style={{
                  backgroundColor: `${theme.color}10`,
                  padding: '15px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.color}30`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <h4 style={{ 
                    margin: 0, 
                    color: theme.color, 
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    {assignment.title}
                  </h4>
                  {assignment.grade && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        backgroundColor: getGradeColor(assignment.grade),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {getGradeLetter(assignment.grade)}
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: getGradeColor(assignment.grade)
                      }}>
                        {assignment.grade}%
                      </div>
                    </div>
                  )}
                </div>
                
                <div style={{ fontSize: '12px', color: theme.color, marginBottom: '8px' }}>
                  Status: <span style={{ fontWeight: 'bold' }}>{assignment.status}</span>
                </div>
                
                {assignment.grade && (
                  <div style={{ fontSize: '12px', color: theme.color }}>
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grade Statistics */}
      {gradableAssignments.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.color, marginBottom: '15px' }}>Grade Statistics</h3>
          {(() => {
            const gradedAssignments = assignments.filter(a => a.grade !== null && a.grade !== undefined);
            const averageGrade = gradedAssignments.length > 0 
              ? Math.round(gradedAssignments.reduce((sum, a) => sum + a.grade, 0) / gradedAssignments.length)
              : 0;
            
            const gradeDistribution = {
              A: gradedAssignments.filter(a => a.grade >= 90).length,
              B: gradedAssignments.filter(a => a.grade >= 80 && a.grade < 90).length,
              C: gradedAssignments.filter(a => a.grade >= 70 && a.grade < 80).length,
              D: gradedAssignments.filter(a => a.grade >= 60 && a.grade < 70).length,
              F: gradedAssignments.filter(a => a.grade < 60).length
            };

            return (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                <div style={{
                  backgroundColor: `${theme.color}10`,
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: `1px solid ${theme.color}30`
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.color }}>
                    {averageGrade}%
                  </div>
                  <div style={{ color: theme.color, fontSize: '14px' }}>Average Grade</div>
                </div>

                <div style={{
                  backgroundColor: `${theme.color}10`,
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: `1px solid ${theme.color}30`
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.color }}>
                    {gradedAssignments.length}
                  </div>
                  <div style={{ color: theme.color, fontSize: '14px' }}>Graded Assignments</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export default GradeTracker;
