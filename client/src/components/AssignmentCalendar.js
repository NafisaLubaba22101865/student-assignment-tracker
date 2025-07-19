// src/components/AssignmentCalendar.js
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

function AssignmentCalendar({ assignments }) {
  const events = assignments.map((a) => ({
    title: a.title + ` (${a.status})`,
    start: new Date(a.dueDate),
    end: new Date(a.dueDate),
    allDay: true,
  }));

  return (
    <div style={{ height: '350px', marginTop: '40px', maxWidth: '900px', margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>📅 Assignment Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 300, maxWidth: '900px', margin: '0 auto' }}
        eventPropGetter={(event) => {
          let bgColor = '#2196f3';
          if (event.title.includes('Completed')) bgColor = '#4caf50';
          else if (event.title.includes('In Progress')) bgColor = '#ff9800';
          else if (event.title.includes('Not Started')) bgColor = '#f44336';
          return { style: { backgroundColor: bgColor, color: 'white', borderRadius: '6px' } };
        }}
      />
    </div>
  );
}

export default AssignmentCalendar;
