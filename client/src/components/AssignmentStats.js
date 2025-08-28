import React from 'react';

function AssignmentStats({ assignments, theme }) {
  // Calculate statistics
  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter(a => a.status === 'Completed').length;
  const inProgressAssignments = assignments.filter(a => a.status === 'In Progress').length;
  const notStartedAssignments = assignments.filter(a => a.status === 'Not Started').length;
  
  const completionRate = totalAssignments > 0 ? Math.round((completedAssignments / totalAssignments) * 100) : 0;
  
  // Grade statistics
  const gradedAssignments = assignments.filter(a => a.grade !== null && a.grade !== undefined);
  const averageGrade = gradedAssignments.length > 0 
    ? Math.round(gradedAssignments.reduce((sum, a) => sum + a.grade, 0) / gradedAssignments.length)
    : 0;
  
  const highestGrade = gradedAssignments.length > 0 
    ? Math.max(...gradedAssignments.map(a => a.grade))
    : 0;
  
  const lowestGrade = gradedAssignments.length > 0 
    ? Math.min(...gradedAssignments.map(a => a.grade))
    : 0;

  // Study time statistics
  const totalStudyHours = assignments.reduce((sum, a) => sum + (a.studyTime?.totalHours || 0), 0);
  const averageStudyHours = totalAssignments > 0 ? Math.round((totalStudyHours / totalAssignments) * 10) / 10 : 0;

  // Upcoming deadlines (next 7 days)
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingDeadlines = assignments.filter(a => {
    const dueDate = new Date(a.dueDate);
    return dueDate >= today && dueDate <= nextWeek && a.status !== 'Completed';
  });

  // Overdue assignments
  const overdueAssignments = assignments.filter(a => {
    const dueDate = new Date(a.dueDate);
    return dueDate < today && a.status !== 'Completed';
  });

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
        📊 Assignment Statistics
      </h2>

      {/* Main Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        {/* Completion Rate */}
        <div style={{
          backgroundColor: `${theme.color}10`,
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center',
          border: `1px solid ${theme.color}30`
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.color }}>
            {completionRate}%
          </div>
          <div style={{ color: theme.color, fontSize: '14px' }}>Completion Rate</div>
          <div style={{ color: theme.color, fontSize: '12px', marginTop: '5px' }}>
            {completedAssignments}/{totalAssignments} assignments
          </div>
        </div>

        {/* Average Grade */}
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
          <div style={{ color: theme.color, fontSize: '12px', marginTop: '5px' }}>
            {gradedAssignments.length} graded assignments
          </div>
        </div>

        {/* Total Study Hours */}
        <div style={{
          backgroundColor: `${theme.color}10`,
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center',
          border: `1px solid ${theme.color}30`
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.color }}>
            {totalStudyHours}h
          </div>
          <div style={{ color: theme.color, fontSize: '14px' }}>Total Study Time</div>
          <div style={{ color: theme.color, fontSize: '12px', marginTop: '5px' }}>
            {averageStudyHours}h average per assignment
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div style={{
          backgroundColor: `${theme.color}10`,
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center',
          border: `1px solid ${theme.color}30`
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.color }}>
            {upcomingDeadlines.length}
          </div>
          <div style={{ color: theme.color, fontSize: '14px' }}>Due This Week</div>
          <div style={{ color: theme.color, fontSize: '12px', marginTop: '5px' }}>
            {overdueAssignments.length} overdue
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: theme.color, marginBottom: '15px' }}>Status Breakdown</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '10px'
        }}>
          <div style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{completedAssignments}</div>
            <div style={{ fontSize: '12px' }}>Completed</div>
          </div>
          <div style={{
            backgroundColor: '#ffc107',
            color: 'black',
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{inProgressAssignments}</div>
            <div style={{ fontSize: '12px' }}>In Progress</div>
          </div>
          <div style={{
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{notStartedAssignments}</div>
            <div style={{ fontSize: '12px' }}>Not Started</div>
          </div>
        </div>
      </div>

      {/* Grade Range */}
      {gradedAssignments.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.color, marginBottom: '15px' }}>Grade Range</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '10px'
          }}>
            <div style={{
              backgroundColor: `${theme.color}10`,
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              border: `1px solid ${theme.color}30`
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: theme.color }}>{highestGrade}%</div>
              <div style={{ fontSize: '12px', color: theme.color }}>Highest</div>
            </div>
            <div style={{
              backgroundColor: `${theme.color}10`,
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              border: `1px solid ${theme.color}30`
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: theme.color }}>{lowestGrade}%</div>
              <div style={{ fontSize: '12px', color: theme.color }}>Lowest</div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: theme.color, marginBottom: '10px' }}>Overall Progress</h3>
        <div style={{
          width: '100%',
          height: '20px',
          backgroundColor: `${theme.color}20`,
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${completionRate}%`,
            height: '100%',
            backgroundColor: theme.buttonBg,
            transition: 'width 0.3s ease'
          }}></div>
        </div>
        <div style={{ 
          textAlign: 'center', 
          marginTop: '5px', 
          fontSize: '12px', 
          color: theme.color 
        }}>
          {completionRate}% Complete
        </div>
      </div>

      {/* Alerts */}
      {(overdueAssignments.length > 0 || upcomingDeadlines.length > 0) && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.color, marginBottom: '15px' }}>⚠️ Alerts</h3>
          {overdueAssignments.length > 0 && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: '1px solid #f5c6cb'
            }}>
              <strong>{overdueAssignments.length} assignment(s) overdue!</strong>
            </div>
          )}
          {upcomingDeadlines.length > 0 && (
            <div style={{
              backgroundColor: '#fff3cd',
              color: '#856404',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ffeaa7'
            }}>
              <strong>{upcomingDeadlines.length} assignment(s) due this week!</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AssignmentStats;
