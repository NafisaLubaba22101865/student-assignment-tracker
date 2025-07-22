import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function AssignmentCalendar({ assignments }) {
  // Map assignments to FullCalendar event objects
  const events = assignments.map((a) => ({
    title: `${a.title} (${a.status})`,
    start: a.dueDate,
    allDay: true,
    backgroundColor:
      a.status === 'Completed' ? '#4caf50' :
      a.status === 'In Progress' ? '#ff9800' :
      a.status === 'Not Started' ? '#f44336' :
      '#2196f3',
    borderColor: 'transparent',
  }));

  return (
    <>
      { }
      <style>{`
        .fc-col-header-cell-cushion {
          color: #002aff !important;
          font-weight: bold !important;
        }
      `}</style>

      <div style={{ maxWidth: '1000px', margin: '40px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>📅 Assignment Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
          height="auto"
        />
      </div>
    </>
  );
}

export default AssignmentCalendar;
