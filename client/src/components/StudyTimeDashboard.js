import React from 'react';

function StudyTimeDashboard({ assignments, theme }) {
  const calculateStats = () => {
    const totalHours = assignments.reduce((sum, assignment) => {
      return sum + (assignment.studyTime?.totalHours || 0);
    }, 0);

    const assignmentsWithStudyTime = assignments.filter(
      assignment => assignment.studyTime?.totalHours > 0
    );

    const averageHoursPerAssignment = assignmentsWithStudyTime.length > 0 
      ? totalHours / assignmentsWithStudyTime.length 
      : 0;

    const mostStudiedAssignment = assignments.reduce((max, assignment) => {
      const hours = assignment.studyTime?.totalHours || 0;
      return hours > (max.studyTime?.totalHours || 0) ? assignment : max;
    }, {});

    return {
      totalHours,
      assignmentsWithStudyTime: assignmentsWithStudyTime.length,
      averageHoursPerAssignment,
      mostStudiedAssignment
    };
  };

  const stats = calculateStats();

  return (
    <div style={{
      backgroundColor: theme.cardBackground,
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: `1px solid ${theme.color}20`,
      boxShadow: theme.cardShadow
    }}>
      <h2 style={{ marginTop: 0, color: theme.color, textAlign: 'center' }}>📊 Study Time Dashboard</h2>
      
              <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '15px'
        }}>
          {/* Total Study Hours */}
          <div style={{
            backgroundColor: theme.cardBackground,
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            border: `1px solid ${theme.color}20`,
            boxShadow: theme.cardShadow
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: theme.buttonBg }}>⏱️ Total Hours</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.buttonBg }}>
              {stats.totalHours.toFixed(1)}h
            </div>
          </div>

          {/* Assignments with Study Time */}
          <div style={{
            backgroundColor: theme.cardBackground,
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            border: `1px solid ${theme.color}20`,
            boxShadow: theme.cardShadow
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: theme.buttonHover }}>📚 Active Assignments</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.buttonHover }}>
              {stats.assignmentsWithStudyTime}
            </div>
            <small style={{ color: `${theme.color}80` }}>
              out of {assignments.length} total
            </small>
          </div>

          {/* Average Hours */}
          <div style={{
            backgroundColor: theme.cardBackground,
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            border: `1px solid ${theme.color}20`,
            boxShadow: theme.cardShadow
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>📈 Average Hours</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
              {stats.averageHoursPerAssignment.toFixed(1)}h
            </div>
            <small style={{ color: `${theme.color}80` }}>
              per assignment
            </small>
          </div>

          {/* Most Studied Assignment */}
          <div style={{
            backgroundColor: theme.cardBackground,
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            border: `1px solid ${theme.color}20`,
            boxShadow: theme.cardShadow
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>🏆 Most Studied</h3>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#dc3545' }}>
              {stats.mostStudiedAssignment.title || 'None'}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#dc3545' }}>
              {(stats.mostStudiedAssignment.studyTime?.totalHours || 0).toFixed(1)}h
            </div>
          </div>
        </div>

      {/* Study Progress Bar */}
      {assignments.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: theme.color, marginBottom: '10px' }}>Study Progress</h4>
          <div style={{
            backgroundColor: `${theme.color}20`,
            borderRadius: '10px',
            height: '20px',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: theme.buttonBg,
              height: '100%',
              width: `${(stats.assignmentsWithStudyTime / assignments.length) * 100}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          <small style={{ color: `${theme.color}80` }}>
            {stats.assignmentsWithStudyTime} of {assignments.length} assignments have study time logged
          </small>
        </div>
      )}
    </div>
  );
}

export default StudyTimeDashboard;
