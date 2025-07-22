// frontend/src/components/WriteAssignmentPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function WriteAssignmentPage() {
  const { id } = useParams(); // assignment ID from URL
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [assignment, setAssignment] = useState(null);
  const [isPastDue, setIsPastDue] = useState(false);

  // Fetch assignment by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/assignments/${id}`)
      .then(res => res.json())
      .then(data => {
        setAssignment(data);
        setContent(data.content || '');
        const due = new Date(data.dueDate);
        const now = new Date();
        setIsPastDue(now > due);
      })
      .catch(err => console.error('Error fetching assignment:', err));
  }, [id]);

  // Submit the updated content
  const handleSubmit = () => {
    if (isPastDue) return;

    fetch(`http://localhost:5000/api/assignments/${id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
      .then(res => res.json())
      .then(() => {
        alert('✅ Assignment submitted!');
        navigate('/');
      })
      .catch(err => console.error('Submission error:', err));
  };

  if (!assignment) return <p>Loading...</p>;

  return (
    <div style={{ padding: '30px', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <h2>{assignment.title}</h2>
      <p><strong>Due:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>

      <ReactQuill
        value={content}
        onChange={setContent}
        readOnly={isPastDue}
        theme="snow"
        style={{ height: '300px', marginBottom: '60px' }}
      />

      <div style={{ marginTop: '60px' }}>
        <button
          onClick={handleSubmit}
          disabled={isPastDue}
          style={{
            padding: '12px 24px',
            backgroundColor: isPastDue ? '#f1bcbc' : '#13535c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: isPastDue ? 'not-allowed' : 'pointer'
          }}
        >
          Submit
        </button>

        {isPastDue && (
          <p style={{ color: 'red', marginTop: '15px' }}>
            ❌ Cannot edit after the due date.
          </p>
        )}
      </div>
    </div>
  );
}

export default WriteAssignmentPage;
