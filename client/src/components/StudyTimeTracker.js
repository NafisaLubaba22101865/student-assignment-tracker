import React, { useState, useEffect } from 'react';

function StudyTimeTracker({ assignment, onUpdate, theme }) {
  const [hours, setHours] = useState('');
  const [notes, setNotes] = useState('');
  const [studyTime, setStudyTime] = useState({ totalHours: 0, sessions: [] });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch study time data when component mounts
  useEffect(() => {
    if (assignment?._id) {
      fetchStudyTime();
    }
  }, [assignment?._id]);

  const fetchStudyTime = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${assignment._id}/study-time`);
      if (response.ok) {
        const data = await response.json();
        setStudyTime(data);
      }
    } catch (error) {
      console.error('Error fetching study time:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hours || parseFloat(hours) <= 0) {
      alert('Please enter a valid number of hours');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${assignment._id}/study-time`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hours: parseFloat(hours),
          notes: notes
        }),
      });

      if (response.ok) {
        const updatedAssignment = await response.json();
        setStudyTime({
          totalHours: updatedAssignment.studyTime.totalHours,
          sessions: updatedAssignment.studyTime.sessions
        });
        setHours('');
        setNotes('');
        if (onUpdate) {
          onUpdate(updatedAssignment);
        }
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to log study time');
      }
    } catch (error) {
      console.error('Error logging study time:', error);
      alert('Failed to log study time');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString() + ' ' + 
           new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{
      backgroundColor: theme.cardBackground,
      padding: '20px',
      borderRadius: '8px',
      marginTop: '15px',
      border: `1px solid ${theme.color}20`,
      boxShadow: theme.cardShadow
    }}>
      <h3 style={{ marginTop: 0, color: theme.color }}>⏱️ Study Time Tracker</h3>
      
      {/* Total Hours Display */}
      <div style={{
        backgroundColor: `${theme.color}10`,
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'center'
      }}>
        <strong style={{ color: theme.color }}>Total Study Time: {studyTime.totalHours.toFixed(1)} hours</strong>
      </div>

      {/* Add Study Session Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="number"
            step="0.1"
            min="0.1"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '5px',
              border: `1px solid ${theme.color}40`,
              width: '100px',
              backgroundColor: theme.cardBackground,
              color: theme.color
            }}
            required
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '5px',
              border: `1px solid ${theme.color}40`,
              flex: 1,
              minWidth: '200px',
              backgroundColor: theme.cardBackground,
              color: theme.color
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '8px 16px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: isLoading ? '#6c757d' : theme.buttonBg,
              color: 'white',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isLoading ? 'Logging...' : 'Log Study Time'}
          </button>
        </div>
      </form>

      {/* Study Sessions History */}
      {studyTime.sessions.length > 0 && (
        <div>
          <h4 style={{ marginBottom: '10px', color: theme.color }}>Study Sessions History</h4>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {studyTime.sessions.slice().reverse().map((session, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: theme.cardBackground,
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '8px',
                  border: `1px solid ${theme.color}20`,
                  boxShadow: theme.cardShadow
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: theme.color }}>{session.hours} hours</strong>
                    {session.notes && <span style={{ marginLeft: '10px', color: `${theme.color}80` }}>- {session.notes}</span>}
                  </div>
                  <small style={{ color: `${theme.color}80` }}>{formatDate(session.date)}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyTimeTracker;
